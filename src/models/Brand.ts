import mongoose, { Schema, model, models } from 'mongoose';

const BrandSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    logoUrl: { type: String },
    primaryColor: { type: String, default: '#000000' },
    secondaryColor: { type: String, default: '#ffffff' },
    tone: {
        type: String,
        enum: ['Professional', 'Friendly', 'Premium', 'Bold'],
        default: 'Professional'
    },
    motto: { type: String },
    industry: { type: String },
    fontPreference: {
        type: String,
        enum: ['Modern', 'Serif', 'Minimal', 'Creative'],
        default: 'Modern'
    },
    createdAt: { type: Date, default: Date.now },
});

const Brand = models.Brand || model('Brand', BrandSchema);

export default Brand;
