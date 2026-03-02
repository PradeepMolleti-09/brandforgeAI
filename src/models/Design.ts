import mongoose, { Schema, model, models } from 'mongoose';

const DesignSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: String, required: true },
    description: { type: String },
    platform: { type: String, enum: ['Instagram', 'LinkedIn', 'Poster'], required: true },
    aspectRatio: { type: String, enum: ['1:1', '4:5', '16:9'], default: '1:1' },
    templateType: { type: String },
    elementsJson: { type: Array, default: [] }, // Stores array of CanvasElement objects
    layoutJson: { type: Schema.Types.Mixed },     // General metadata (bg color etc)
    aiContent: {                              // Stores structured AI generated copy
        templateSuggestion: String,
        headline: String,
        subtitle: String,
        cta: String,
        bulletPoints: [String],
        imagePrompt: String
    },
    aiOutputJson: {
        headlines: [String],
        captions: [String],
        ctas: [String],
        imageUrls: [String],
    },
    finalImageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Design = models.Design || model('Design', DesignSchema);

export default Design;
