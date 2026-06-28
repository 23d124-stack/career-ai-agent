class InterviewAgent:

    def generate_question(self, role):

        prompt = f"""
        Generate interview question
        for {role}
        """

        return model.generate_content(prompt).text

    def evaluate_answer(
        self,
        question,
        answer
    ):

        prompt = f"""
        Question:
        {question}

        Candidate Answer:
        {answer}

        Give:

        - Score /10
        - Feedback
        - Improved Answer
        """

        return model.generate_content(prompt).text