class AttackInfo:
    def __init__(self, name, damage, operator, effect):
        self.name = name
        self.damage = damage
        self.operator = operator
        self.effect = effect

    def to_dict(self):
        return self.__dict__