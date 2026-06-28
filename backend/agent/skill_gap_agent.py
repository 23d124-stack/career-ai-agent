class SkillGapAgent:

    ROLE_SKILLS = {
        "AI Engineer": [
            "Python",
            "Machine Learning",
            "Deep Learning",
            "TensorFlow",
            "PyTorch",
            "LLM"
        ],

        "Data Scientist": [
            "Python",
            "SQL",
            "Pandas",
            "Machine Learning",
            "Statistics"
        ]
    }

    def run(self, user_skills, target_role):

        required_skills = self.ROLE_SKILLS.get(
            target_role,
            []
        )

        missing_skills = [
            skill
            for skill in required_skills
            if skill not in user_skills
        ]

        return {
            "missing_skills": missing_skills
        }