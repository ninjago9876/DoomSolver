export async function getQuestionHandler(request: Request): Promise<Response> {
      const question = {
        id: 'q1',
        prompt: 'What is 2 + 2?',
        options: ['1', '2', '3', '4'],
        correctOption: 1
      };
    
      // Returning a JSON response with the question data
      return new Response(JSON.stringify(question), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
}