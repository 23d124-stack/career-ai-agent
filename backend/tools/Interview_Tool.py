class InterviewTool:

    QUESTIONS = {

        "AI Engineer":[
            "What is CNN?",
            "What is Transformer?",
            "What is Overfitting?"
        ]
    }

    def generate(self, role):

        return self.QUESTIONS.get(role, [])