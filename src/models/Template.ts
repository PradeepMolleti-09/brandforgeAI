import mongoose, { Schema, model, models } from 'mongoose';

const TemplateSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['movie', 'sale', 'business', 'event', 'minimal'], required: true },
    defaultLayoutJson: { type: Schema.Types.Mixed, required: true },
    thumbnailUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Template = models.Template || model('Template', TemplateSchema);

export default Template;
