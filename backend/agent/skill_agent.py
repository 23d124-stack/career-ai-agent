class ResumeAnalyzerAgent:

    def run(self, resume_text):

        prompt = f"""
        Analyze this resume.

        Extract:

        - Skills
        - Projects
        - Education
        - Experience

        Resume:
        {resume_text}

        Return JSON.
        """

        return model.generate_content(prompt).text