{
  "name": "UserProgress",
  "type": "object",
  "properties": {
    "level": {
      "type": "string",
      "enum": [
        "beginner",
        "intermediate",
        "advanced"
      ],
      "default": "beginner"
    },
    "xp_points": {
      "type": "number",
      "default": 0
    },
    "streak_days": {
      "type": "number",
      "default": 0
    },
    "last_practice_date": {
      "type": "string",
      "format": "date"
    },
    "lessons_completed": {
      "type": "number",
      "default": 0
    },
    "conversations_count": {
      "type": "number",
      "default": 0
    },
    "writing_exercises_count": {
      "type": "number",
      "default": 0
    },
    "vocab_learned": {
      "type": "number",
      "default": 0
    },
    "ai_credits_used": {
      "type": "number",
      "default": 0
    }
  },
  "required": [
    "level"
  ]
}