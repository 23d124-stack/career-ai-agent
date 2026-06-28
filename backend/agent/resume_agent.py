import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

class RoadmapAgent:

    def run(self, target_role):

        prompt = f"""
Create a detailed learning roadmap for becoming a {target_role}.

Include:

1. Beginner skills
2. Intermediate skills
3. Advanced skills
4. Projects
5. Certifications
6. Resources
7. Timeline

Return the answer in clear bullet points.
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.5,
        )

        return response.choices[0].message.content