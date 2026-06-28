class CareerAdvisorAgent:

    def run(self, skills):

        prompt = f"""
        User Skills:

        {skills}

        Suggest:

        - Suitable careers
        - Salary range
        - Future demand
        """

        return model.generate_content(prompt).text