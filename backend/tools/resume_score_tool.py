class ResumeScoreTool:

    def score(self, skills):

        score = 40

        if "python" in skills.lower():
            score += 10

        if "machine learning" in skills.lower():
            score += 15

        if "sql" in skills.lower():
            score += 10

        if "docker" in skills.lower():
            score += 10

        if "aws" in skills.lower():
            score += 15

        return min(score, 100)