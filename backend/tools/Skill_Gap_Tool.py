class SkillGapTool:

    ROLE_SKILLS = {

        "AI Engineer":[
            "python",
            "machine learning",
            "deep learning",
            "docker",
            "aws"
        ]
    }

    def analyze(self, skills, role):

        current = [
            s.strip().lower()
            for s in skills.split(",")
        ]

        required = self.ROLE_SKILLS.get(role, [])

        missing = []

        for skill in required:

            if skill not in current:
                missing.append(skill)

        return missing