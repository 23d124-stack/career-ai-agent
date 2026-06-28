from datetime import datetime

class AutoApplyAgent:

    def apply(self, jobs):

        applied = []

        for job in jobs[:5]:

            applied.append({
                "company": job["company"],
                "role": job["title"],
                "status": "Applied",
                "date": str(datetime.now())
            })

        return applied