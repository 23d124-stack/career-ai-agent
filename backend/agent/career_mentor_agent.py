import json


class CareerMentorAgent:

    def __init__(self, client):
        self.client = client

    def process(self, user_data):

        prompt = f"""
You are an Expert AI Career Mentor Agent.

Candidate Details:

Name:
{user_data['name']}

Skills:
{user_data['skills']}

Resume Content:
{user_data['resume_text']}

Target Role:
{user_data['target_role']}

Preferred Company:
{user_data['preferred_company']}

Preferred Domain:
{user_data['preferred_domain']}

Preferred Location:
{user_data['preferred_location']}

Job Type:
{user_data['job_type']}

Live Jobs:
{user_data['live_jobs']}

Analyze the resume and profile.

Calculate:

1. Resume Score (0-100)
2. ATS Score (0-100)
3. Placement Score (0-100)
4. Skill Gap Percentage (0-100)

Identify:

- Strengths
- Missing Skills
- Career Roadmap
- Interview Questions
- Recommended Jobs
- Best Matching Live Jobs
- Weekly Study Plan
- Weekly Reminders

Return ONLY VALID JSON.

JSON FORMAT:

{{
    "resume_score": 0,
    "ats_score": 0,
    "placement_score": 0,
    "skill_gap_percentage": 0,

    "strengths": [],

    "missing_skills": [],

    "roadmap": [],

    "interview_questions": [],

    "recommended_jobs": [],

    "best_matching_live_jobs": [],

    "weekly_study_plan": [],

    "weekly_reminders": [],

    "auto_apply_recommended": true
}}
"""

        response = self.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3
        )

        text = response.choices[0].message.content

        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        try:
            return json.loads(text)

        except Exception as e:

            return {
                "error": str(e),
                "raw_response": text
            }