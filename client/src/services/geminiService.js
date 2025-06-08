import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export const generateCourse = async (topic) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate a comprehensive course structure for "${topic}". Include:
    1. Course title
    2. Brief description
    3. Duration (in weeks)
    4. Difficulty level (Beginner/Intermediate/Advanced)
    5. Learning objectives (3-5 points)
    6. Course modules (4-6 modules with titles and brief descriptions)
    
    Format the response as a JSON object with the following structure:
    {
      "title": "string",
      "description": "string",
      "duration": "string",
      "level": "string",
      "objectives": ["string"],
      "modules": [
        {
          "title": "string",
          "description": "string"
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the response text as JSON
    const courseData = JSON.parse(text);
    
    // Validate the course data structure
    if (!courseData.title || !courseData.description || !courseData.modules) {
      throw new Error('Invalid course data structure received from AI');
    }

    return courseData;
  } catch (error) {
    console.error('Error generating course:', error);
    throw new Error('Failed to generate course content. Please try again.');
  }
};

export const generateModuleContent = async (moduleTopic) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate detailed content for the module "${moduleTopic}". Include:
    1. Key concepts (3-5 points)
    2. Examples (2-3 examples)
    3. Practice exercises (2-3 exercises)
    4. Additional resources (2-3 resources)
    
    Format the response as a JSON object with the following structure:
    {
      "concepts": ["string"],
      "examples": ["string"],
      "exercises": ["string"],
      "resources": ["string"]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the response text as JSON
    const moduleData = JSON.parse(text);
    
    // Validate the module data structure
    if (!moduleData.concepts || !moduleData.examples) {
      throw new Error('Invalid module data structure received from AI');
    }

    return moduleData;
  } catch (error) {
    console.error('Error generating module content:', error);
    throw new Error('Failed to generate module content. Please try again.');
  }
}; 