class CardInfo:
    def __init__(self, name, img_url, artist, setcode, number, pack, rarity):
        self.name = name
        self.img_url = img_url
        self.artist = artist
        self.setcode = setcode
        self.number = number
        self.pack = pack
        self.rarity = rarity
    
    def to_dict(self):
        return self.__dict__

class PokemonInfo(CardInfo):
    def __init__(self, name, img_url, artist, setcode, number, pack, rarity, type, stage, evolution, hp, attacks, weakness, retreat, description, ex):
        super().__init__(name, img_url, artist, setcode, number, pack, rarity)
        self.type = type
        self.stage = stage
        self.evolution = evolution
        self.hp = hp
        self.attacks = attacks
        self.weakness = weakness
        self.retreat = retreat
        self.description = description
        self.ex = ex
    
    def to_dict(self):
        base = super().to_dict()
        base.update({
            "type": self.type,
            "stage": self.stage,
            "evolution": self.evolution,
            "hp": self.hp,
            "attacks": [attack.to_dict() for attack in self.attacks],
            "weakness": self.weakness,
            "retreat": self.retreat,
            "description": self.description,
            "ex": self.ex
        })
        return base

class TrainerInfo(CardInfo):
    def __init__(self, name, img_url, artist, setcode, number, pack, rarity, category, effect):
        super().__init__(name, img_url, artist, setcode, number, pack, rarity)
        self.category = category
        self.effect = effect
    
    def to_dict(self):
        base = super().to_dict()
        base.update({
            "category": self.category,
            "effect": self.effect
        })
        return base