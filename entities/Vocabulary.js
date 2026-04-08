{
  "name": "Vocabulary",
  "type": "object",
  "properties": {
    "arabic_word": {
      "type": "string"
    },
    "transliteration": {
      "type": "string"
    },
    "french_translation": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": [
        "greetings",
        "numbers",
        "family",
        "food",
        "travel",
        "daily_life",
        "body",
        "colors",
        "animals",
        "work"
      ]
    },
    "difficulty": {
      "type": "string",
      "enum": [
        "beginner",
        "intermediate",
        "advanced"
      ]
    },
    "mastered": {
      "type": "boolean",
      "default": false
    },
    "practice_count": {
      "type": "number",
      "default": 0
    }
  },
  "required": [
    "arabic_word",
    "french_translation",
    "category"
  ]
}