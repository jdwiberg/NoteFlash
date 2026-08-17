from typing import Literal

NoteLetter = Literal["E", "A", "D", "G", "B", "e"]

## game that just spits out a note and a string
class Game:

    def __init__(self, flats: bool, sharps: bool, naturals: bool, strings: list[NoteLetter]):
        self.flats = flats
        self.sharps = sharps
        self.naturals = naturals
        self.strings = strings

    def get_note(self) -> str:
        