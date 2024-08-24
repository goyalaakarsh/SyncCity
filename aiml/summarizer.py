import google.generativeai as genai

api_key = "AIzaSyB1_MJBhlk5m6jiNysEAVOZ_15lMReO_d4"
genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-1.5-flash')

project_details = sys.argv[1]

try:
    response = model.generate_content(f"Summarize the following project details in 2-3 lines: {project_details}")
    print(response.text)
except Exception as e:
    print(f"An error occurred: {e}")
