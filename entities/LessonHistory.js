{
  "name": "LessonHistory",
  "type": "object",
  "properties": {
    "lesson_type": {
      "type": "string",
      "enum": [
        "conversation",
        "writing",
        "vocabulary",
        "alphabet",
        "grammar"
      ]
    },
    "topic": {
      "type": "string"
    },
    "score": {
      "type": "number"
    },
    "duration_minutes": {
      "type": "number"
    },
    "ai_feedback": {
      "type": "string"
    },
    "xp_earned": {
      "type": "number"
    }
  },
  "required": [
    "lesson_type",
    "topic"
  ]
}