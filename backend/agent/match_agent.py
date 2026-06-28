class MatchAgent:

    def calculate_match(self, user_skills, job):

        job_text = (
            job["title"] + " " +
            job.get("company", "")
        ).lower()

        matches = 0

        for skill in user_skills:
            if skill.lower() in job_text:
                matches += 1

        score = int(
            (matches / max(len(user_skills), 1)) * 100
        )

        return score