import requests
from bs4 import BeautifulSoup
import random
import time
import json
from SetInfo import SetInfo
from AttackInfo import AttackInfo
from CardInfo import *
import mysql.connector

BASE_URL = "https://pocket.limitlesstcg.com"


db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="pocketdex"
)
cursor = db.cursor()

def get_sets():
    html_text = requests.get(BASE_URL + "/cards").text
    soup = BeautifulSoup(html_text, 'lxml')

    table = soup.find('table', class_ = 'sets-table')
    rows = table.find_all('tr')

    sets = []
    for r in rows:
        cols = r.find_all("td")
        if len(cols) == 3:
            href = cols[0].find("a")["href"]
            set_code = cols[0].find("span", class_ = "code annotation").text
            img_url = cols[0].find("img")["src"]
            set_name = cols[0].find("span", class_ = "set-icon").next_sibling.strip()
            release_date = cols[1].find("a").text.strip()
            card_count = cols[2].find("a").text.strip()

            sets.append(SetInfo(set_name, set_code, release_date, int(card_count), img_url, BASE_URL + href))
    # Save to JSON
    with open("sets.json", "w") as f:
        json.dump([s.__dict__ for s in sets], f, indent=2)
    return sets
    
def scrape_pokemon(url, setcode):
        card_html_text = requests.get(url).text
        soup2 = BeautifulSoup(card_html_text, 'lxml')
        info = soup2.find("section", class_ = "card-page-main")
        card_details = info.find("div", class_ = "card-details")

        # card image and artist
        img_url = info.find("img", class_ = "card shadow resp-w")["src"]
        artist = card_details.find("div", class_ = "card-text-section card-text-artist").find("a").text.strip()

        # name and description/ex
        ex = False
        name = card_details.find("span", class_ = "card-text-name").text.strip()
        description = card_details.find("div", class_ = "card-text-section card-text-flavor")
        if description:
            description = description.text.strip()
        else:
            ex = True
        
        # type and hp in 1 string
        text = card_details.find("span", class_ = "card-text-name").next_sibling.strip()
        parts = [p.strip() for p in text.split("-") if p.strip()]
        type = parts[0]
        hp = int(parts[1].replace("HP", "").strip())

        # stage and evolution
        text = card_details.find("p", class_ = "card-text-type").text.strip()
        parts = [p.strip() for p in text.split("-") if p.strip()]
        stage = parts[1].strip()
        evolves_from = None
        if len(parts) == 3:
            evolves_from = parts[2].replace("Evolves from", "").strip()

        # attack info
        attacks = []
        attack_info = card_details.find_all("div", class_ = "card-text-attack")
        for att in attack_info:
            att_cost = att.find("span", class_ = "ptcg-symbol").text.strip()
            text = att.find("span", class_ = "ptcg-symbol").next_sibling.strip()
            parts = text.strip().split()
            if any(char.isdigit() for char in parts[-1]):
                att_dmg = parts[-1]
                att_name = ' '.join(parts[:-1])
            else:
                att_dmg = None
                att_name = text
            dmg_num = ""
            operator = ""
            if att_dmg: 
                for c in att_dmg:
                    if c.isdigit():
                        dmg_num += c
                    else:
                        operator += c
            att_effect = att.find("p", class_ = "card-text-attack-effect").text.strip()
            attacks.append(AttackInfo(att_name, dmg_num, operator, att_effect))
        
        
        # weakness and retreat
        text = card_details.find("p", class_ = "card-text-wrr").text.strip()
        parts = [p.strip() for p in text.split(" ") if p.strip()]
        weakness = parts[1].strip()
        retreat = parts[3].strip()

        # number, rarity, and pack
        spans = info.find("div", class_ = "prints-current-details").find_all("span")
        text = spans[1].text.strip()
        parts = [p.strip() for p in text.split("·") if p.strip()]

        number = parts[0].replace("#", "")
        rarity = None
        pack = None
        if (not setcode == "P-A"):
            rarity = parts[1]
            pack = parts[2] if len(parts) > 2 else None

        return PokemonInfo(name, img_url, artist, setcode, number, pack, rarity, type, stage, evolves_from, hp, attacks, weakness, retreat, description, ex)

def scrape_trainer(url, setcode):
    card_html_text = requests.get(url).text
    soup2 = BeautifulSoup(card_html_text, 'lxml')
    info = soup2.find("section", class_ = "card-page-main")
    card_details = info.find("div", class_ = "card-details")
    card_texts = card_details.find_all("div", class_ = "card-text-section")

    # card image and artist
    img_url = info.find("img", class_ = "card shadow resp-w")["src"]
    artist = card_details.find("div", class_ = "card-text-section card-text-artist").find("a").text.strip()
    
    # name
    name = card_texts[0].find("span", class_ = "card-text-name").text.strip()

    # category
    text = card_texts[0].find("p", class_ = "card-text-type").text.strip()
    parts = [p.strip() for p in text.split("-") if p.strip()]
    category = parts[1].strip()

    # effect 
    effect = card_texts[1].text.strip()

    # number, rarity, and pack
    spans = info.find("div", class_ = "prints-current-details").find_all("span")
    text = spans[1].text.strip()
    parts = [p.strip() for p in text.split("·") if p.strip()]

    number = parts[0].replace("#", "")
    rarity = None
    pack = None
    if (not setcode == "P-A"):
        rarity = parts[1]
        pack = parts[2] if len(parts) > 2 else None

    return TrainerInfo(name, img_url, artist, setcode, number, pack, rarity, category, effect)

#Convert into get_cards and save everything into a card_info class
def get_cards(set):
    set_html_text = requests.get(set.url).text
    soup = BeautifulSoup(set_html_text, 'lxml')
    grid = soup.find("div", class_ = "card-search-grid")
    hrefs = grid.find_all("a")
    cards = []
    for h in hrefs:
        card_url = BASE_URL + h["href"]
        card_html_text = requests.get(card_url).text
        soup2 = BeautifulSoup(card_html_text, 'lxml')
        info = soup2.find("section", class_ = "card-page-main")
        card_details = info.find("div", class_ = "card-details")
        text = card_details.find("p", class_ = "card-text-type").text.strip()
        parts = [p.strip() for p in text.split("-") if p.strip()]
        card_type = parts[0].strip()
        if card_type == "Pokémon":
            cards.append(scrape_pokemon(card_url, set.code))
        else:
            cards.append(scrape_trainer(card_url, set.code))
        #print("Scraped " + cards[-1].name)
        time.sleep(random.uniform(0.3, 0.5))
    return cards

def insert_set(set_obj, cursor):
    cursor.execute("""
        INSERT INTO sets (
            set_id, name, release_date, card_count, img_url, url
        ) VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        set_obj.code,
        set_obj.name,
        set_obj.release_date,
        set_obj.card_count,
        set_obj.img_url,
        set_obj.url
    ))

def insert_pokemon(card, cursor):
    cursor.execute("""
        INSERT INTO cards (
            set_id, set_number, name, img_url, artist, pack, rarity,
            type, stage, evolution, hp, weakness, retreat,
            description, is_ex, category, effect
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NULL, NULL)
    """, (
        card.setcode,
        int(card.number),
        card.name,
        card.img_url,
        card.artist,
        card.pack,
        card.rarity,
        card.type,
        card.stage,
        card.evolution,
        card.hp,
        card.weakness,
        card.retreat,
        card.description,
        card.ex
    ))

def insert_trainer(card, cursor):
    cursor.execute("""
        INSERT INTO cards (
            set_id, set_number, name, img_url, artist, pack, rarity,
            type, stage, evolution, hp, weakness, retreat,
            description, is_ex, category, effect
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, %s, %s)
    """, (
        card.setcode,
        int(card.number),
        card.name,
        card.img_url,
        card.artist,
        card.pack,
        card.rarity,
        card.category,
        card.effect
    ))

def insert_attacks(card, cursor):
    for i, attack in enumerate(card.attacks):
        cursor.execute("""
            INSERT INTO attacks (
                set_id, set_number, attack_id, name, damage, operator, effect
            ) VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            card.setcode,
            int(card.number),
            i,
            attack.name,
            int(attack.damage) if attack.damage else None,
            attack.operator,
            attack.effect
        ))

def main():
    print("Scraping sets...")
    sets = get_sets()
    print(f"Found {len(sets)} sets.")
    # 💾 Save sets to JSON
    with open("../data/sets.json", "w") as f:
        json.dump([s.__dict__ for s in sets], f, indent=2)
    print(f"Saved {len(sets)} sets to sets.json.")

    cards = []
    for set in sets:
         print(f"Scraping {set.name} ({set.code})...")
         cards.extend(get_cards(set))
         print(f"  Found {len(cards)} cards.")
         insert_set(set, cursor)
         print(f"Saved {set.name}")

    with open("../data/cards.json", "w") as f:
        json.dump([card.to_dict() for card in cards], f, indent=2)
    print(f"Saved {len(cards)} cards to cards.json.") 

    print(f"Saving cards to database...")
    for card in cards:
        if isinstance(card, PokemonInfo):
            insert_pokemon(card, cursor)
            insert_attacks(card, cursor)
        elif isinstance(card, TrainerInfo):
            insert_trainer(card, cursor)

    db.commit()
    print(f"Saved.")
    

if __name__ == "__main__":
    main()