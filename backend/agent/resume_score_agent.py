class ResumeScoreAgent:

    def calculate_score(self, skills, projects, experience):

        score = 0

        score += min(len(skills) * 5, 40)

        score += min(len(projects) * 10, 30)

        score += min(len(experience) * 15, 30)

        return score