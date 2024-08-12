import { NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
    try {
        const feedback = await req.json();
        const feedbackPath = path.join(process.cwd(), 'feedback.json');
        let existingFeedback = [];

        try {
            const data = await fs.readFile(feedbackPath, 'utf8');
            existingFeedback = JSON.parse(data);
        } catch (error) {
            // File doesn't exist or is empty, which is fine for the first feedback
        }

        existingFeedback.push(feedback);

        await fs.writeFile(feedbackPath, JSON.stringify(existingFeedback, null, 2));

        return NextResponse.json({ message: 'Feedback submitted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error saving feedback:', error);
        return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
    }
}
