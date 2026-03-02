import { CanvasElement } from '@/store/useEditorStore';
import { v4 as uuidv4 } from 'uuid';

export type TemplateType =
    | 'movie' | 'sale' | 'business' | 'event' | 'minimal' | 'geometric' | 'split' | 'neon' | 'social' | 'product'
    | 'fashion_editorial' | 'food_menu' | 'tech_minimal' | 'luxury_gold' | 'streetwear' | 'corporate_report'
    | 'concert_poster' | 'nature_travel' | 'app_showcase' | 'podcast_cover' | 'resume_boxed' | 'art_gallery'
    | 'retro_disco' | 'cyberpunk' | 'vogue' | 'brutalist' | 'magazine'
    | 'fitness_pro' | 'real_estate' | 'study_guide' | 'minimal_quote' | 'vaporwave' | 'comic_style'
    | 'blueprint' | 'health_care' | 'streamer_overlay' | 'wedding_classic' | 'price_table' | 'timeline_info'
    | 'clean_resume' | 'ticket_pass' | 'membership' | 'feature_highlights' | 'testimonial_card' | 'countdown'
    | 'grid_collage' | 'profile_bio' | 'certificate_award' | 'news_breaking' | 'travel_guide' | 'urban_explore'
    | 'gaming_leaderboard' | 'yoga_peace' | 'startup_launch' | 'craft_artisan' | 'seasonal_promo' | 'dark_minimal'
    | 'bright_pop' | 'industrial' | 'architectural' | 'vintage_label' | 'crypto_token' | 'webinar_host' | 'ebook_cover'
    | 'product_launch' | 'thank_you' | 'hiring_now' | 'portfolio_showcase' | 'mobile_app' | 'fitness_challenge'
    | 'recipe_card' | 'music_album' | 'festival_lineup' | 'quote_minimal' | 'story_background' | 'service_pricing'
    | 'meetup_event' | 'workshop_promo' | 'charity_gala' | 'real_estate_luxury' | 'car_sales' | 'interior_design'
    | 'pet_grooming' | 'bakery_special' | 'coffee_shop' | 'beauty_salon' | 'barber_shop' | 'dentist_clinic'
    | 'legal_service' | 'it_consulting' | 'marketing_agency' | 'software_update' | 'game_stream' | 'movie_review'
    | 'book_club' | 'art_workshop' | 'photography_studio' | 'dance_class' | 'yoga_retreat' | 'meditation_zen'
    | 'nightclub_party' | 'summer_vibes' | 'winter_clearance' | 'spring_bloom' | 'autumn_leaf' | 'magic';

interface TemplateOptions {
    width: number;
    height: number;
    headline?: string;
    subtitle?: string;
    cta?: string;
    backgroundImage?: string;
    primaryColor?: string;
    secondaryColor?: string;
    description?: string;
    bulletPoints?: string[];
}

export function generateTemplate(type: TemplateType, options: TemplateOptions): CanvasElement[] {
    const { width, height, headline, subtitle, cta, backgroundImage, primaryColor = '#4f46e5', secondaryColor = '#ffffff', description, bulletPoints } = options;
    const elements: CanvasElement[] = [];

    const scale = Math.min(width, height) / 1000; // Base on 1000px canonical size

    /**
     * Helper to estimate and cap font size for fixed-width containers
     */
    const calcBestFontSize = (text: string, maxWidth: number, baseMax: number) => {
        if (!text) return baseMax;

        const words = text.split(/\s+/);
        const longestWord = Math.max(...words.map(w => w.length));

        // 1. Fit the longest word on a single line if possible
        // (Rough char width is ~0.55 of font size)
        let fitSize = baseMax;
        const charWidthRatio = 0.55;

        if (longestWord * fitSize * charWidthRatio > maxWidth) {
            fitSize = maxWidth / (longestWord * charWidthRatio);
        }

        // 2. Wrap total text count (Rough lines check)
        // Assume we want to stay within ~2-3 lines for headlines
        const totalChars = text.length;
        const estimatedLines = (totalChars * fitSize * charWidthRatio) / maxWidth;

        if (estimatedLines > 3) {
            fitSize = fitSize * (3 / estimatedLines);
        }

        // 3. Absolute floor for readability
        return Math.max(fitSize, 14 * (width / 1000));
    };

    const addElement = (el: Partial<CanvasElement>) => {
        let finalFontSize = el.fontSize;

        // Auto-scale font sizes for text elements if they don't look "perfect"
        if (el.type === 'text' && el.text) {
            const targetWidth = el.width || width * 0.9;
            const baseMax = el.fontSize || 40 * scale;
            finalFontSize = calcBestFontSize(el.text, targetWidth, baseMax);
        }

        elements.push({
            id: uuidv4(),
            rotation: 0,
            opacity: 1,
            fill: '#001e3c',
            x: 0,
            y: 0,
            width: 100 * scale,
            height: 100 * scale,
            ...el,
            fontSize: finalFontSize
        } as CanvasElement);
    };

    switch (type) {
        case 'fashion_editorial':
            addElement({ type: 'rect', width, height, fill: '#ffffff' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: width * 0.4, y: 0, width: width * 0.6, height });
            addElement({ type: 'text', text: headline || "SPRING\nCOLLECTION", x: width * 0.05, y: height * 0.15, width: width * 0.4, fontSize: 64 * scale, fontFamily: 'Bodoni Moda', fontWeight: '900', fill: '#000' });
            addElement({ type: 'text', text: subtitle || "New Arrivals 2026", x: width * 0.05, y: height * 0.45, width: width * 0.3, fontSize: 18 * scale, fontFamily: 'Montserrat', fill: '#666' });
            addElement({ type: 'rect', x: width * 0.05, y: height * 0.7, width: 40 * scale, height: 2 * scale, fill: '#000' });
            break;

        case 'vogue':
            addElement({ type: 'rect', width, height, fill: '#1a1a1a' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, width, height });
            addElement({ type: 'text', text: "VOGUE", x: 0, y: height * 0.05, width, fontSize: width * 0.25, fontFamily: 'Cinzel', fontWeight: '900', fill: '#fff', textAlign: 'center', opacity: 0.9 });
            addElement({ type: 'text', text: headline || "THE FUTURE OF STYLE", x: width * 0.1, y: height * 0.7, width: width * 0.8, fontSize: 24, fontFamily: 'Montserrat', fontWeight: '700', fill: '#fff', textAlign: 'center' });
            break;

        case 'food_menu':
            addElement({ type: 'rect', width, height, fill: '#fff8f0' });
            addElement({ type: 'rect', x: 20 * scale, y: 20 * scale, width: width - 40 * scale, height: height - 40 * scale, fill: 'transparent', stroke: '#c2410c', strokeWidth: 2 * scale });
            addElement({ type: 'text', text: headline || "CHEF'S SPECIAL", x: width * 0.1, y: 60 * scale, width: width * 0.8, fontSize: 42 * scale, fontFamily: 'Playfair Display', fontWeight: '900', fill: '#c2410c', textAlign: 'center' });
            addElement({ type: 'text', text: "Hand-crafted delicacies for the soul.", x: width * 0.1, y: 120 * scale, width: width * 0.8, fontSize: 16 * scale, fontFamily: 'Inter', fill: '#451a03', textAlign: 'center' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: width * 0.2, y: height * 0.4, width: width * 0.6, height: height * 0.45, cornerRadius: 20 * scale });
            break;

        case 'luxury_gold':
            addElement({ type: 'rect', width, height, fill: '#0f172a' });
            addElement({ type: 'rect', x: width * 0.05, y: height * 0.05, width: width * 0.9, height: height * 0.9, fill: 'transparent', stroke: '#d97706', strokeWidth: 1 });
            addElement({ type: 'text', text: headline || "PREMIUM", x: 0, y: height * 0.35, width, fontSize: 56, fontFamily: 'Cinzel Decorative', fontWeight: '900', fill: '#d97706', textAlign: 'center' });
            addElement({ type: 'text', text: subtitle || "EXCELLENCE IN EVERY DETAIL", x: 0, y: height * 0.5, width, fontSize: 14, fontFamily: 'Montserrat', fill: '#94a3b8', textAlign: 'center', letterSpacing: 8 });
            break;

        case 'brutalist':
            addElement({ type: 'rect', width, height, fill: '#000' });
            addElement({ type: 'rect', x: 10, y: 10, width: width * 0.6, height: height * 0.7, fill: '#ffde00' });
            addElement({ type: 'text', text: headline || "DESIGN\nSYSTEM", x: 25, y: 30, width: width * 0.5, fontSize: 72, fontFamily: 'Archivo Black', fontWeight: '900', fill: '#000' });
            addElement({ type: 'text', text: subtitle || "VOL. 01 / 2026", x: width * 0.65, y: height * 0.1, width: width * 0.3, fontSize: 14, fontFamily: 'Space Mono', fill: '#fff' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: width * 0.3, y: height * 0.5, width: width * 0.6, height: height * 0.4, opacity: 0.8 });
            break;

        case 'cyberpunk':
            addElement({ type: 'rect', width, height, fill: '#000' });
            addElement({ type: 'rect', x: 0, y: height * 0.4, width, height: 2 * scale, fill: '#f0f' });
            addElement({ type: 'text', text: headline || "NEURAL LINK", x: width * 0.1, y: height * 0.3, width: width * 0.8, fontSize: 52 * scale, fontFamily: 'Orbitron', fontWeight: '900', fill: '#0ff', textAlign: 'center', shadowBlur: 20 * scale, shadowColor: '#0ff' });
            addElement({ type: 'rect', x: width * 0.2, y: height * 0.6, width: width * 0.6, height: 40 * scale, fill: 'transparent', stroke: '#f0f', strokeWidth: 1 * scale });
            addElement({ type: 'text', text: cta || "INITIALIZE", x: width * 0.2, y: height * 0.6 + 10 * scale, width: width * 0.6, fontSize: 16 * scale, fontFamily: 'JetBrains Mono', fill: '#f0f', textAlign: 'center' });
            break;

        case 'nature_travel':
            addElement({ type: 'rect', width, height, fill: '#064e3b' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, width, height, opacity: 0.7 });
            addElement({ type: 'text', text: headline || "EXPLORE THE WILD", x: width * 0.1, y: height * 0.4, width: width * 0.8, fontSize: 48, fontFamily: 'Comfortaa', fontWeight: '700', fill: '#fff', textAlign: 'center' });
            addElement({ type: 'rect', x: width * 0.45, y: height * 0.55, width: width * 0.1, height: 2, fill: '#fff' });
            addElement({ type: 'text', text: subtitle || "Mountain Expeditions 2026", x: width * 0.1, y: height * 0.6, width: width * 0.8, fontSize: 16, fontFamily: 'Inter', fill: '#fff', textAlign: 'center' });
            break;

        case 'magazine':
            addElement({ type: 'rect', width, height, fill: '#fff' });
            addElement({ type: 'rect', x: 0, y: 0, width, height: height * 0.1, fill: '#000' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: 20, y: height * 0.12, width: width - 40, height: height * 0.5 });
            addElement({ type: 'text', text: headline || "THE MODERN DESIGNER", x: 20, y: height * 0.65, width: width * 0.9, fontSize: 32, fontFamily: 'Archivo Black', fill: '#000' });
            addElement({ type: 'text', text: description || "In-depth look at AI in creative workspaces.", x: 20, y: height * 0.72, width: width - 80, fontSize: 14, fontFamily: 'Inter', fill: '#555' });
            break;

        case 'retro_disco':
            addElement({ type: 'rect', width, height, fill: '#831843' });
            addElement({ type: 'circle', x: width * 0.5, y: height * 0.4, width: 300, height: 300, fill: '#db2777', opacity: 0.6 });
            addElement({ type: 'text', text: headline || "DISCO NIGHT", x: 0, y: height * 0.3, width, fontSize: 72, fontFamily: 'Bungee Shade', fill: '#f472b6', textAlign: 'center' });
            addElement({ type: 'text', text: "FEEL THE GROOVE", x: 0, y: height * 0.5, width, fontSize: 24, fontFamily: 'Righteous', fill: '#fff', textAlign: 'center' });
            break;

        case 'app_showcase':
            addElement({ type: 'rect', width, height, fill: '#f1f5f9' });
            addElement({ type: 'rect', x: width * 0.25, y: height * 0.1, width: width * 0.5, height: height * 0.7, fill: '#fff', cornerRadius: 40, shadowBlur: 30, shadowColor: '#000' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: width * 0.28, y: height * 0.13, width: width * 0.44, height: height * 0.64, cornerRadius: 30 });
            addElement({ type: 'text', text: headline || "DOWNLOAD NOW", x: 0, y: height * 0.85, width, fontSize: 22, fontFamily: 'Inter', fontWeight: '900', fill: primaryColor, textAlign: 'center' });
            break;

        case 'art_gallery':
            addElement({ type: 'rect', width, height, fill: '#fcfcfc' });
            addElement({ type: 'rect', x: width * 0.1, y: height * 0.1, width: width * 0.8, height: height * 0.6, fill: '#f1f1f1', stroke: '#000', strokeWidth: 1 });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: width * 0.15, y: height * 0.15, width: width * 0.7, height: height * 0.5 });
            addElement({ type: 'text', text: headline || "UNREVEALED", x: width * 0.1, y: height * 0.75, width: width * 0.8, fontSize: 28, fontFamily: 'Forum', fill: '#000' });
            addElement({ type: 'text', text: "Solo Exhibition by Estelle Darcy", x: width * 0.1, y: height * 0.8, width: width * 0.8, fontSize: 12, fontFamily: 'Inter', fill: '#888', letterSpacing: 2 });
            break;

        case 'fitness_pro':
            addElement({ type: 'rect', width, height, fill: '#000' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, width, height, opacity: 0.6 });
            addElement({ type: 'text', text: headline || "NO PAIN\nNO GAIN", x: width * 0.05, y: height * 0.5, width: width * 0.9, fontSize: 80, fontFamily: 'Rubik Mono One', fill: '#fbbf24', fontStyle: 'italic' });
            addElement({ type: 'rect', x: width * 0.05, y: height * 0.8, width: width * 0.4, height: 40, fill: '#fbbf24' });
            addElement({ type: 'text', text: "SIGN UP", x: width * 0.05, y: height * 0.8 + 10, width: width * 0.4, fontSize: 18, fill: '#000', textAlign: 'center', fontWeight: '900' });
            break;

        case 'real_estate':
            addElement({ type: 'rect', width, height, fill: '#f8fafc' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: 0, y: 0, width, height: height * 0.6 });
            addElement({ type: 'rect', x: 0, y: height * 0.55, width, height: height * 0.45, fill: '#1e293b' });
            addElement({ type: 'text', text: headline || "MODERN FAMILY HOME", x: 30, y: height * 0.62, width: width - 60, fontSize: 32, fontFamily: 'Playfair Display', fill: '#fff' });
            addElement({ type: 'text', text: "$850,000", x: 30, y: height * 0.72, width: width - 60, fontSize: 24, fontFamily: 'Inter', fontWeight: '900', fill: '#38bdf8' });
            break;

        case 'vaporwave':
            addElement({ type: 'rect', width, height, fill: '#2e1065' });
            addElement({ type: 'circle', x: width / 2, y: height * 0.4, width: 250, height: 250, fill: '#db2777' });
            addElement({ type: 'text', text: headline || "AESTHETIC", x: 0, y: height * 0.5, width, fontSize: 64, fontFamily: 'Permanent Marker', fill: '#5eead4', textAlign: 'center', rotation: -5 });
            break;

        case 'minimal_quote':
            addElement({ type: 'rect', width, height, fill: '#fff' });
            addElement({ type: 'text', text: "“", x: 40, y: 100, width: 100, fontSize: 120, fontFamily: 'Playfair Display', fill: '#e2e8f0' });
            addElement({ type: 'text', text: headline || "Dream big and dare to fail.", x: 80, y: height * 0.35, width: width - 160, fontSize: 32, fontFamily: 'Lora', fontStyle: 'italic', fill: '#334155', textAlign: 'center' });
            break;

        case 'comic_style':
            addElement({ type: 'rect', width, height, fill: '#facc15' });
            addElement({ type: 'rect', x: 20, y: 20, width: width - 40, height: height - 40, fill: '#fff', stroke: '#000', strokeWidth: 4 });
            addElement({ type: 'text', text: headline || "WHAM!", x: width * 0.1, y: height * 0.2, width: width * 0.8, fontSize: 90, fontFamily: 'Bangers', fill: '#ef4444', textAlign: 'center', stroke: '#000', strokeWidth: 2 });
            break;

        case 'study_guide':
            addElement({ type: 'rect', width, height, fill: '#eff6ff' });
            addElement({ type: 'rect', x: 0, y: 0, width: 60, height, fill: '#3b82f6' });
            addElement({ type: 'text', text: headline || "QUANTUM PHYSICS\nBASICS", x: 100, y: 80, width: width - 140, fontSize: 36, fontFamily: 'Inter', fontWeight: '900', fill: '#1e3a8a' });
            addElement({ type: 'text', text: "MODULE 01", x: 100, y: 180, width: 200, fontSize: 16, fontFamily: 'Space Mono', fill: '#3b82f6' });
            break;

        case 'blueprint':
            addElement({ type: 'rect', width, height, fill: '#1e40af' });
            addElement({ type: 'rect', x: 0, y: 0, width, height, stroke: '#fff', strokeWidth: 0.5, opacity: 0.3 }); // Grid simulated
            addElement({ type: 'text', text: headline || "ARCHITECTURAL\nPLAN A-102", x: 40, y: 40, width: width - 80, fontSize: 24, fontFamily: 'Courier New', fill: '#fff', opacity: 0.8 });
            addElement({ type: 'rect', x: 40, y: height * 0.4, width: width - 80, height: 2, fill: '#fff', opacity: 0.5 });
            break;

        case 'health_care':
            addElement({ type: 'rect', width, height, fill: '#ffffff' });
            addElement({ type: 'rect', x: 0, y: 0, width, height: 10, fill: '#0ea5e9' });
            addElement({ type: 'text', text: headline || "YOUR HEALTH\nMATTERS", x: width * 0.1, y: height * 0.15, width: width * 0.8, fontSize: 42, fontFamily: 'Inter', fontWeight: '900', fill: '#0c4a6e' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: width * 0.1, y: height * 0.4, width: width * 0.8, height: height * 0.4, cornerRadius: 15 });
            break;

        case 'streamer_overlay':
            addElement({ type: 'rect', width, height, fill: 'transparent' });
            addElement({ type: 'rect', x: 20, y: height - 100, width: width - 40, height: 80, fill: '#18181b', cornerRadius: 10, opacity: 0.9, stroke: '#a855f7', strokeWidth: 2 });
            addElement({ type: 'text', text: headline || "NOW PLAYING: NEW GAME", x: 40, y: height - 75, width: width - 80, fontSize: 20, fontFamily: 'Oswald', fill: '#a855f7' });
            break;

        case 'wedding_classic':
            addElement({ type: 'rect', width, height, fill: '#fffafa' });
            addElement({ type: 'text', text: "Save the Date", x: 0, y: height * 0.2, width, fontSize: 24, fontFamily: 'Great Vibes', fill: '#b45309', textAlign: 'center' });
            addElement({ type: 'text', text: headline || "AURORA & JULIAN", x: 0, y: height * 0.35, width, fontSize: 48, fontFamily: 'Cinzel', fill: '#b45309', textAlign: 'center' });
            addElement({ type: 'text', text: "OCTOBER 24, 2026", x: 0, y: height * 0.55, width, fontSize: 16, fontFamily: 'Montserrat', fill: '#78350f', textAlign: 'center', letterSpacing: 5 });
            break;

        case 'price_table':
            addElement({ type: 'rect', width, height, fill: '#f8fafc' });
            addElement({ type: 'rect', x: width * 0.1, y: height * 0.2, width: width * 0.8, height: height * 0.6, fill: '#fff', cornerRadius: 20, shadowBlur: 20 });
            addElement({ type: 'text', text: headline || "PREMIUM PLAN", x: width * 0.1, y: height * 0.25, width: width * 0.8, fontSize: 24, fontWeight: '900', fill: '#1e293b', textAlign: 'center' });
            addElement({ type: 'text', text: "$49/mo", x: width * 0.1, y: height * 0.4, width: width * 0.8, fontSize: 48, fontWeight: '900', fill: '#0284c7', textAlign: 'center' });
            break;

        case 'timeline_info':
            addElement({ type: 'rect', width, height, fill: '#ffffff' });
            addElement({ type: 'rect', x: width * 0.2, y: 50, width: 4, height: height - 100, fill: '#e2e8f0' });
            addElement({ type: 'circle', x: width * 0.2, y: 100, width: 20, height: 20, fill: '#3b82f6' });
            addElement({ type: 'text', text: headline || "PROJECT MILESTONE", x: width * 0.3, y: 90, width: width * 0.6, fontSize: 24, fontWeight: '700', fill: '#1e293b' });
            break;

        case 'clean_resume':
            addElement({ type: 'rect', width, height, fill: '#ffffff' });
            addElement({ type: 'rect', x: 0, y: 0, width: width * 0.35, height, fill: '#f1f5f9' });
            addElement({ type: 'text', text: headline || "JOHN DOE", x: 30, y: 50, width: width * 0.3, fontSize: 28, fontWeight: '900', fill: '#1e293b' });
            addElement({ type: 'text', text: "CREATIVE DIRECTOR", x: 30, y: 90, width: width * 0.3, fontSize: 14, fill: '#64748b' });
            break;

        case 'ticket_pass':
            addElement({ type: 'rect', width, height, fill: '#000' });
            addElement({ type: 'rect', x: 20, y: 20, width: width - 40, height: height - 40, fill: '#1e293b', stroke: '#fbbf24', strokeWidth: 2 });
            addElement({ type: 'text', text: "VIP PASS", x: 40, y: 60, width: 200, fontSize: 14, fontFamily: 'Space Mono', fill: '#fbbf24' });
            addElement({ type: 'text', text: headline || "ADMIT ONE", x: 40, y: height * 0.4, width: width - 80, fontSize: 48, fontWeight: '900', fill: '#fff' });
            break;

        case 'membership':
            addElement({ type: 'rect', width, height, fill: '#111827' });
            addElement({ type: 'rect', x: width * 0.05, y: height * 0.3, width: width * 0.9, height: height * 0.4, fill: '#1f2937', cornerRadius: 20, stroke: '#6366f1', strokeWidth: 1 });
            addElement({ type: 'text', text: "PLATINUM MEMBER", x: width * 0.1, y: height * 0.35, width: width * 0.8, fontSize: 18, fontFamily: 'Cinzel', fill: '#818cf8' });
            addElement({ type: 'text', text: headline || "EXCELLENCE CARD", x: width * 0.1, y: height * 0.55, width: width * 0.8, fontSize: 14, fontFamily: 'Space Mono', fill: '#9ca3af' });
            break;

        case 'feature_highlights':
            addElement({ type: 'rect', width, height, fill: '#ffffff' });
            addElement({ type: 'text', text: headline || "CORE FEATURES", x: 0, y: 60, width, fontSize: 32, fontWeight: '900', textAlign: 'center', fill: '#1e293b' });
            addElement({ type: 'rect', x: width * 0.1, y: 150, width: width * 0.8, height: 100, fill: '#f8fafc', cornerRadius: 15 });
            addElement({ type: 'text', text: "✓ High Performance", x: width * 0.15, y: 185, width: width * 0.7, fontSize: 18, fontWeight: '700', fill: '#0ea5e9' });
            break;

        case 'testimonial_card':
            addElement({ type: 'rect', width, height, fill: '#f0f9ff' });
            addElement({ type: 'circle', x: width / 2, y: 80, width: 60, height: 60, fill: '#0ea5e9' });
            addElement({ type: 'text', text: headline || "This app changed my life!", x: width * 0.1, y: 160, width: width * 0.8, fontSize: 22, fontStyle: 'italic', fill: '#1e293b', textAlign: 'center' });
            addElement({ type: 'text', text: "- Alexander Wright", x: 0, y: 240, width, fontSize: 14, fontWeight: '700', fill: '#64748b', textAlign: 'center' });
            break;

        case 'countdown':
            addElement({ type: 'rect', width, height, fill: '#450a0a' });
            addElement({ type: 'text', text: headline || "LAUNCHING IN", x: 0, y: height * 0.2, width, fontSize: 18, fill: '#f87171', textAlign: 'center', letterSpacing: 10 });
            addElement({ type: 'text', text: "08 : 14 : 22", x: 0, y: height * 0.4, width, fontSize: 72, fontFamily: 'Space Mono', fill: '#fff', textAlign: 'center' });
            addElement({ type: 'rect', x: width / 2 - 60, y: height * 0.6, width: 120, height: 4, fill: '#ef4444' });
            break;

        case 'grid_collage':
            addElement({ type: 'rect', width, height, fill: '#fff' });
            addElement({ type: 'rect', x: 10, y: 10, width: width / 2 - 15, height: height / 2 - 15, fill: '#f1f5f9' });
            addElement({ type: 'rect', x: width / 2 + 5, y: 10, width: width / 2 - 15, height: height / 2 - 15, fill: '#e2e8f0' });
            addElement({ type: 'text', text: headline || "SUMMER VIBES", x: 0, y: height * 0.8, width, fontSize: 32, fontWeight: '900', fill: '#000', textAlign: 'center' });
            break;

        case 'profile_bio':
            addElement({ type: 'rect', width, height, fill: '#ffffff' });
            addElement({ type: 'circle', x: width / 2, y: 120, width: 140, height: 140, fill: '#f1f5f9', stroke: primaryColor, strokeWidth: 4 });
            addElement({ type: 'text', text: headline || "SARAH CONNOR", x: 0, y: 220, width, fontSize: 24, fontWeight: '900', fill: '#1e293b', textAlign: 'center' });
            addElement({ type: 'text', text: "Digital Artist | Visionary", x: 0, y: 260, width, fontSize: 14, fill: '#64748b', textAlign: 'center' });
            break;

        case 'certificate_award':
            addElement({ type: 'rect', width, height, fill: '#fff' });
            addElement({ type: 'rect', x: 40, y: 40, width: width - 80, height: height - 80, fill: 'transparent', stroke: '#d97706', strokeWidth: 5 });
            addElement({ type: 'text', text: "CERTIFICATE OF ACHIEVEMENT", x: 0, y: 100, width, fontSize: 20, fontFamily: 'Cinzel', fill: '#1e293b', textAlign: 'center' });
            addElement({ type: 'text', text: headline || "PRESENTED TO", x: 0, y: 180, width, fontSize: 14, fill: '#64748b', textAlign: 'center' });
            addElement({ type: 'text', text: "VALUED PARTNER", x: 0, y: height * 0.65, width, fontSize: 32, fontFamily: 'Great Vibes', fill: '#d97706', textAlign: 'center' });
            break;

        case 'news_breaking':
            addElement({ type: 'rect', width, height, fill: '#000' });
            addElement({ type: 'rect', x: 0, y: height - 120, width, height: 120, fill: '#ef4444' });
            addElement({ type: 'text', text: "BREAKING NEWS", x: 20, y: height - 100, width: 300, fontSize: 18, fontWeight: '900', fill: '#fff' });
            addElement({ type: 'text', text: headline || "MARKET HITS ALL TIME HIGH", x: 20, y: height - 60, width: width - 40, fontSize: 28, fontWeight: '900', fill: '#fff' });
            break;

        case 'travel_guide':
            addElement({ type: 'rect', width, height, fill: '#0ea5e9' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, width, height, opacity: 0.8 });
            addElement({ type: 'rect', x: 30, y: 30, width: 120, height: 40, fill: '#ffffff', opacity: 0.3, cornerRadius: 5 });
            addElement({ type: 'text', text: "DESTINATION", x: 30, y: 40, width: 120, fontSize: 12, fontWeight: '900', fill: '#fff', textAlign: 'center' });
            addElement({ type: 'text', text: headline || "SANTORINI, GREECE", x: 30, y: height * 0.8, width: width - 60, fontSize: 36, fontWeight: '900', fill: '#fff', shadowBlur: 10 });
            break;

        case 'urban_explore':
            addElement({ type: 'rect', width, height, fill: '#18181b' });
            addElement({ type: 'text', text: headline || "URBAN\nDECAY", x: 20, y: 60, width: width - 40, fontSize: 80, fontWeight: '900', fill: '#fff', opacity: 0.1 });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: 40, y: 140, width: width - 80, height: height * 0.5, cornerRadius: 0 });
            addElement({ type: 'text', text: "STREET PHOTOGRAPHY 2026", x: 40, y: height - 100, width: 300, fontSize: 14, fontFamily: 'Space Mono', fill: '#71717a' });
            break;

        case 'gaming_leaderboard':
            addElement({ type: 'rect', width, height, fill: '#0f172a' });
            addElement({ type: 'text', text: headline || "TOP PLAYERS", x: 0, y: 50, width, fontSize: 32, fontWeight: '900', fill: '#f59e0b', textAlign: 'center' });
            addElement({ type: 'rect', x: width * 0.1, y: 120, width: width * 0.8, height: 50, fill: '#1e293b', cornerRadius: 5 });
            addElement({ type: 'text', text: "1. ELITE_GAMER", x: width * 0.15, y: 135, width: width * 0.7, fontSize: 18, fill: '#fff' });
            break;

        case 'yoga_peace':
            addElement({ type: 'rect', width, height, fill: '#fdf4ff' });
            addElement({ type: 'circle', x: width / 2, y: height / 2, width: 350, height: 350, fill: '#f5d0fe', opacity: 0.3 });
            addElement({ type: 'text', text: headline || "INNER PEACE", x: 0, y: height * 0.4, width, fontSize: 52, fontFamily: 'Comfortaa', fill: '#c026d3', textAlign: 'center' });
            addElement({ type: 'text', text: "Find your balance today.", x: 0, y: height * 0.55, width, fontSize: 16, fill: '#701a75', textAlign: 'center' });
            break;

        case 'startup_launch':
            addElement({ type: 'rect', width, height, fill: '#fff' });
            addElement({ type: 'rect', x: 0, y: 0, width: 2, height, fill: '#6366f1' });
            addElement({ type: 'text', text: headline || "REVOLUTIONIZING\nTHE FUTURE", x: 60, y: 60, width: width - 100, fontSize: 32, fontWeight: '900', fill: '#1e293b' });
            addElement({ type: 'rect', x: 60, y: 180, width: 150, height: 40, fill: '#6366f1', cornerRadius: 5 });
            addElement({ type: 'text', text: "WAITLIST", x: 60, y: 190, width: 150, fontSize: 14, fill: '#fff', textAlign: 'center' });
            break;

        case 'craft_artisan':
            addElement({ type: 'rect', width, height, fill: '#fafaf9' });
            addElement({ type: 'rect', x: width / 2 - 1, y: 50, width: 2, height: height - 100, fill: '#e7e5e4' });
            addElement({ type: 'text', text: headline || "HANDMADE\nWITH LOVE", x: width * 0.1, y: height * 0.4, width: width * 0.35, fontSize: 24, fontFamily: 'Bodoni Moda', fill: '#444' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: width * 0.55, y: height * 0.25, width: width * 0.35, height: height * 0.5 });
            break;

        case 'seasonal_promo':
            addElement({ type: 'rect', width, height, fill: '#fee2e2' });
            addElement({ type: 'circle', x: 0, y: height, width: 200, height: 200, fill: '#ef4444', opacity: 0.1 });
            addElement({ type: 'text', text: headline || "WINTER\nCOLLECTION", x: width * 0.1, y: height * 0.3, width: width * 0.8, fontSize: 42, fontWeight: '900', fill: '#991b1b', textAlign: 'center' });
            addElement({ type: 'text', text: "SALE UP TO 70% OFF", x: 0, y: height * 0.5, width, fontSize: 18, fill: '#b91c1c', textAlign: 'center' });
            break;

        case 'dark_minimal':
            addElement({ type: 'rect', width, height, fill: '#0a0a0a' });
            addElement({ type: 'text', text: headline || "SILENCE", x: 0, y: height * 0.45, width, fontSize: 12, fill: '#555', textAlign: 'center', letterSpacing: 20 });
            addElement({ type: 'rect', x: width / 2 - 1, y: height * 0.55, width: 2, height: 80, fill: '#fff', opacity: 0.3 });
            break;

        case 'bright_pop':
            addElement({ type: 'rect', width, height, fill: '#f472b6' });
            addElement({ type: 'circle', x: width * 0.8, y: height * 0.2, width: 120, height: 120, fill: '#fef08a' });
            addElement({ type: 'text', text: headline || "HELLO\nSUMMER", x: width * 0.1, y: height * 0.3, width: width * 0.8, fontSize: 64, fontFamily: 'Bangers', fill: '#fff', stroke: '#db2777', strokeWidth: 2 });
            break;

        case 'industrial':
            addElement({ type: 'rect', width, height, fill: '#2d2d2d' });
            addElement({ type: 'rect', x: 0, y: 0, width, height, fill: 'transparent', stroke: '#555', strokeWidth: 20 });
            addElement({ type: 'text', text: headline || "FORGED\nSTEEL", x: 40, y: height * 0.35, width: width - 80, fontSize: 52, fontWeight: '900', fill: '#fff', opacity: 0.8 });
            break;

        case 'architectural':
            addElement({ type: 'rect', width, height, fill: '#fff' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: 0, y: 0, width: width * 0.7, height });
            addElement({ type: 'rect', x: width * 0.65, y: 0, width: width * 0.35, height, fill: '#18181b' });
            addElement({ type: 'text', text: "VIEW", x: width * 0.7, y: height * 0.45, width: width * 0.25, fontSize: 14, fontFamily: 'Montserrat', fill: '#fff', letterSpacing: 10 });
            addElement({ type: 'text', text: headline || "MODERN\nSPACE", x: width * 0.4, y: height * 0.75, width: width * 0.5, fontSize: 32, fontWeight: '900', fill: '#000' });
            break;

        case 'vintage_label':
            addElement({ type: 'rect', width, height, fill: '#fde68a' });
            addElement({ type: 'rect', x: 20, y: 20, width: width - 40, height: height - 40, fill: 'transparent', stroke: '#92400e', strokeWidth: 2 });
            addElement({ type: 'text', text: "ESTD. 1924", x: 0, y: 60, width, fontSize: 12, fill: '#92400e', textAlign: 'center' });
            addElement({ type: 'text', text: headline || "OLD TOWN\nSPIRITS", x: 0, y: height * 0.35, width, fontSize: 42, fontFamily: 'Playfair Display', fill: '#78350f', textAlign: 'center' });
            break;

        case 'podcast_cover':
            addElement({ type: 'rect', width, height, fill: '#1e1b4b' });
            addElement({ type: 'rect', x: width * 0.1, y: width * 0.1, width: width * 0.8, height: width * 0.8, fill: '#312e81', cornerRadius: 10 });
            addElement({ type: 'text', text: headline || "THE TECH\nINSIDER", x: width * 0.15, y: height * 0.55, width: width * 0.7, fontSize: 32, fontWeight: '900', fill: '#818cf8', textAlign: 'center' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: width * 0.2, y: height * 0.15, width: width * 0.6, height: height * 0.35, cornerRadius: 10 });
            break;

        case 'resume_boxed':
            addElement({ type: 'rect', width, height, fill: '#f8fafc' });
            addElement({ type: 'rect', x: 20, y: 20, width: width - 40, height: 100, fill: '#1e293b', cornerRadius: 10 });
            addElement({ type: 'text', text: headline || "MICHAEL SCOTT", x: 40, y: 40, width: 300, fontSize: 32, fontWeight: '900', fill: '#fff' });
            addElement({ type: 'text', text: "REGIONAL MANAGER", x: 40, y: 80, width: 300, fontSize: 14, fill: '#94a3b8' });
            addElement({ type: 'rect', x: 20, y: 140, width: 4, height: height - 160, fill: '#3b82f6' });
            break;

        case 'corporate_report':
            addElement({ type: 'rect', width, height, fill: '#ffffff' });
            addElement({ type: 'rect', x: 0, y: 0, width: width * 0.3, height, fill: primaryColor });
            addElement({ type: 'text', text: "2026", x: 20, y: 40, width: width * 0.2, fontSize: 24, fontFamily: 'Inter', fontWeight: '900', fill: '#fff' });
            addElement({ type: 'text', text: headline || "ANNUAL REVENUE REPORT", x: width * 0.35, y: 60, width: width * 0.6, fontSize: 36, fontFamily: 'Inter', fontWeight: '900', fill: '#000' });
            addElement({ type: 'rect', x: width * 0.35, y: 130, width: 60, height: 4, fill: primaryColor });
            break;

        case 'movie':
            addElement({ type: 'rect', width, height, fill: '#000000' });
            if (backgroundImage) {
                addElement({ type: 'image', imageUrl: backgroundImage, width, height, opacity: 0.6 });
            }
            // Title - using Math.min for extra safety on extreme ratios
            addElement({
                type: 'text',
                text: (headline || "THE AWAKENING").toUpperCase(),
                x: width * 0.05,
                y: height * 0.6,
                width: width * 0.9,
                fontSize: 100 * scale, // Max size, will be auto-fitted
                fontFamily: 'Oswald',
                fontWeight: '900',
                fill: '#ffffff',
                textAlign: 'center'
            });
            // Subtitle
            addElement({
                type: 'text',
                text: subtitle || "A Story of Epic Proportions",
                x: width * 0.1,
                y: height * 0.75,
                width: width * 0.8,
                fontSize: 24 * scale,
                fontFamily: 'Inter',
                fill: '#ffffff',
                textAlign: 'center'
            });
            // Release Date
            addElement({
                type: 'text',
                text: "COMING SOON 2026",
                x: width * 0.1,
                y: height * 0.88,
                width: width * 0.8,
                fontSize: 14 * scale,
                fontFamily: 'Inter',
                fill: '#ffffff',
                textAlign: 'center',
                letterSpacing: 4 * scale
            } as any);
            break;

        case 'sale':
            addElement({ type: 'rect', width, height, fill: '#f1f5f9' });
            addElement({ type: 'circle', x: width, y: 0, width: width * 0.8, height: width * 0.8, fill: primaryColor, opacity: 0.2 });
            addElement({
                type: 'text',
                text: (headline || "MEGA SALE EVENT").toUpperCase(),
                x: width * 0.05,
                y: height * 0.15,
                width: width * 0.9,
                fontSize: 60 * scale,
                fontFamily: 'Inter',
                fontWeight: '900',
                fill: '#1e293b',
                textAlign: 'center'
            });
            addElement({
                type: 'text',
                text: "50% OFF",
                x: width * 0.1,
                y: height * 0.35,
                width: width * 0.8,
                fontSize: 120 * scale,
                fontFamily: 'Inter',
                fontWeight: '900',
                fill: primaryColor,
                textAlign: 'center'
            });
            addElement({ type: 'rect', x: width / 2 - 100 * scale, y: height * 0.8, width: 200 * scale, height: 50 * scale, fill: primaryColor, cornerRadius: 25 * scale });
            addElement({
                type: 'text',
                text: cta || "SHOP NOW",
                x: width / 2 - 100 * scale,
                y: height * 0.8 + 12 * scale,
                width: 200 * scale,
                fontSize: 18 * scale,
                fill: '#ffffff',
                textAlign: 'center',
                fontWeight: '700'
            });
            break;

        case 'business':
            addElement({ type: 'rect', width, height, fill: '#ffffff' });
            addElement({ type: 'rect', x: width * 0.5, y: 0, width: width * 0.5, height, fill: '#f8fafc' });
            // Headline
            addElement({
                type: 'text',
                text: headline || "GROW YOUR BUSINESS",
                x: width * 0.05,
                y: height * 0.1,
                width: width * 0.4,
                fontSize: width * 0.07,
                fontWeight: '900',
                fill: '#1e293b'
            });
            // Subheading
            addElement({
                type: 'text',
                text: subtitle || "Innovative strategies to scale.",
                x: width * 0.05,
                y: height * 0.25,
                width: width * 0.4,
                fontSize: width * 0.03,
                fill: '#64748b'
            });
            // Decorative bar
            addElement({ type: 'rect', x: width * 0.05, y: height * 0.35, width: 40, height: 6, fill: primaryColor });
            break;

        case 'event':
            addElement({ type: 'rect', width, height, fill: '#111827' });
            addElement({ type: 'circle', x: width / 2, y: height / 2, width: width * 1.2, height: width * 1.2, fill: primaryColor, opacity: 0.1 });
            addElement({
                type: 'text',
                text: (headline || "ANNUAL FESTIVAL").toUpperCase(),
                x: width * 0.1,
                y: height * 0.3,
                width: width * 0.8,
                fontSize: width * 0.1,
                fontWeight: '900',
                fill: '#ffffff',
                textAlign: 'center'
            });
            addElement({
                type: 'text',
                text: subtitle || "OCTOBER 12-14, 2026",
                x: width * 0.1,
                y: height * 0.45,
                width: width * 0.8,
                fontSize: width * 0.05,
                fontWeight: '700',
                fill: primaryColor,
                textAlign: 'center'
            });
            break;

        case 'minimal':
            addElement({ type: 'rect', width, height, fill: '#f8fafc' });
            addElement({
                type: 'text',
                text: "LESS\nIS\nMORE",
                x: width * 0.1,
                y: height * 0.2,
                width: width * 0.8,
                fontSize: width * 0.15,
                fontWeight: '900',
                fill: '#1e293b',
                textAlign: 'left'
            });
            addElement({ type: 'rect', x: width * 0.1, y: height * 0.8, width: 100, height: 2, fill: primaryColor });
            break;

        case 'geometric':
            addElement({ type: 'rect', width, height, fill: '#ffffff' });
            addElement({ type: 'rect', x: 0, y: 0, width: width * 0.6, height: height * 0.4, fill: primaryColor, rotation: -15 });
            addElement({ type: 'rect', x: width * 0.5, y: height * 0.6, width: width * 0.6, height: height * 0.5, fill: '#000000', rotation: 10 });
            addElement({
                type: 'text',
                text: headline || "ABSTRACT\nDESIGN",
                x: width * 0.1,
                y: height * 0.35,
                width: width * 0.8,
                fontSize: width * 0.1,
                fontWeight: '900',
                fill: '#ffffff',
                textAlign: 'center'
            });
            break;

        case 'split':
            addElement({ type: 'rect', width, height, fill: primaryColor });
            addElement({ type: 'rect', x: width / 2, y: 0, width: width / 2, height, fill: '#ffffff' });
            // Text on light side
            addElement({
                type: 'text',
                text: headline || "BOLD CHOICE",
                x: width * 0.55,
                y: height * 0.4,
                width: width * 0.4,
                fontSize: width * 0.08,
                fontWeight: '900',
                fill: '#1e293b'
            });
            break;

        case 'neon':
            addElement({ type: 'rect', width, height, fill: '#000000' });
            addElement({ type: 'rect', x: width * 0.05, y: height * 0.05, width: width * 0.9, height: height * 0.9, fill: 'transparent', stroke: primaryColor, strokeWidth: 2 * scale });
            addElement({
                type: 'text',
                text: headline || "CYBERCORE",
                x: width * 0.1,
                y: height * 0.4,
                width: width * 0.8,
                fontSize: 80 * scale,
                fontWeight: '900',
                fill: primaryColor,
                textAlign: 'center',
                shadowBlur: 20 * scale,
                shadowColor: primaryColor
            });
            break;

        case 'social':
            addElement({ type: 'rect', width, height, fill: '#ffffff' });
            addElement({ type: 'rect', x: 20, y: 20, width: width - 40, height: height * 0.6, fill: '#f8fafc', cornerRadius: 20 });
            addElement({ type: 'circle', x: width / 2, y: height * 0.45, width: 100, height: 100, fill: '#e2e8f0' });
            addElement({
                type: 'text',
                text: "@USER_HANDLE",
                x: width * 0.1,
                y: height * 0.65,
                width: width * 0.8,
                fontSize: 16,
                fontWeight: '700',
                fill: '#64748b',
                textAlign: 'center'
            });
            break;

        case 'product':
            addElement({ type: 'rect', width, height, fill: '#f1f5f9' });
            addElement({ type: 'circle', x: width / 2, y: height / 2, width: width * 0.6, height: width * 0.6, fill: '#ffffff', shadowBlur: 30, shadowOpacity: 0.1 });
            addElement({ type: 'text', text: headline || "PREMIUM QUALITY", x: width * 0.1, y: height * 0.1, width: width * 0.8, fontSize: 24, fontWeight: '900', fill: '#1e293b', textAlign: 'center' });
            addElement({ type: 'rect', x: width / 2 - 50, y: height * 0.8, width: 100, height: 40, fill: primaryColor, cornerRadius: 10 });
            addElement({ type: 'text', text: "$99", x: width / 2 - 50, y: height * 0.8 + 8, width: 100, fontSize: 18, fill: '#ffffff', textAlign: 'center', fontWeight: 'bold' });
            break;

        case 'ebook_cover':
            addElement({ type: 'rect', width, height, fill: '#1e293b' });
            addElement({ type: 'rect', x: width * 0.2, y: height * 0.1, width: width * 0.6, height: height * 0.8, fill: '#fff', shadowBlur: 20 });
            addElement({ type: 'text', text: headline || "THE JOURNEY", x: width * 0.25, y: height * 0.2, width: width * 0.5, fontSize: 32, fontFamily: 'Playfair Display', fill: '#1e293b', textAlign: 'center' });
            break;

        case 'real_estate_luxury':
            addElement({ type: 'rect', width, height, fill: '#0c0a09' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, width, height, opacity: 0.5 });
            addElement({ type: 'text', text: headline || "EXQUISITE VILLA", x: 40, y: height * 0.7, width: width - 80, fontSize: 42, fontFamily: 'Cinzel', fill: '#d97706' });
            break;

        case 'meetup_event':
            addElement({ type: 'rect', width, height, fill: '#fff' });
            addElement({ type: 'rect', x: 0, y: 0, width, height: 10, fill: '#f97316' });
            addElement({ type: 'text', text: headline || "TECH TALK", x: 40, y: 60, width: width - 80, fontSize: 36, fontWeight: '900', fill: '#1e293b' });
            addElement({ type: 'text', text: "EVERY FRIDAY NIGHT", x: 40, y: 120, width: width - 80, fontSize: 14, fill: '#f97316', fontWeight: '800' });
            break;

        case 'workshop_promo':
            addElement({ type: 'rect', width, height, fill: '#10b981' });
            addElement({ type: 'text', text: headline || "DESIGN WORKSHOP", x: 30, y: height * 0.4, width: width - 60, fontSize: 42, fontWeight: '900', fill: '#fff' });
            break;

        case 'pet_grooming':
            addElement({ type: 'rect', width, height, fill: '#f0fdf4' });
            addElement({ type: 'circle', x: width * 0.8, y: height * 0.2, width: 100, height: 100, fill: '#4ade80', opacity: 0.2 });
            addElement({ type: 'text', text: headline || "PAW CARE", x: 30, y: height * 0.4, width: width - 60, fontSize: 32, fontWeight: '900', fill: '#166534' });
            break;

        case 'bakery_special':
            addElement({ type: 'rect', width, height, fill: '#fff7ed' });
            addElement({ type: 'text', text: headline || "FRESH PASTRY", x: 0, y: height * 0.35, width, fontSize: 48, fontFamily: 'Playfair Display', fill: '#9a3412', textAlign: 'center' });
            break;

        case 'barber_shop':
            addElement({ type: 'rect', width, height, fill: '#171717' });
            addElement({ type: 'rect', x: 0, y: 0, width, height: 20, fill: '#dc2626' });
            addElement({ type: 'text', text: headline || "CLASSIC CUT", x: 0, y: height / 2, width, fontSize: 42, fontFamily: 'Bebas Neue', fill: '#fff', textAlign: 'center' });
            break;

        case 'spring_bloom':
            addElement({ type: 'rect', width, height, fill: '#f0fdf4' });
            addElement({ type: 'circle', x: 0, y: 0, width: 400, height: 400, fill: '#4ade80', opacity: 0.1 });
            addElement({ type: 'text', text: headline || "SPRING 2026", x: 0, y: height * 0.4, width, fontSize: 52, fontFamily: 'Comfortaa', fill: '#166534', textAlign: 'center' });
            break;

        case 'fitness_challenge':
            addElement({ type: 'rect', width, height, fill: '#111' });
            addElement({ type: 'text', text: "LEVEL UP", x: 20, y: height * 0.2, width: width - 40, fontSize: 80, fontWeight: '900', fill: '#000', opacity: 0.1 });
            addElement({ type: 'text', text: headline || "30 DAY CHALLENGE", x: 20, y: height * 0.4, width: width - 40, fontSize: 42, fill: '#fbbf24', fontWeight: '900' });
            break;

        case 'quote_minimal':
            addElement({ type: 'rect', width, height, fill: '#fff' });
            addElement({ type: 'text', text: "“", x: 40, y: 100, width: 100, fontSize: 120, fill: '#eee' });
            addElement({ type: 'text', text: headline || "Focus on the step, not the ladder.", x: 60, y: height * 0.4, width: width - 120, fontSize: 24, fontStyle: 'italic', fill: '#1e293b' });
            break;

        case 'story_background':
            addElement({ type: 'rect', width, height, fill: '#f8fafc' });
            addElement({ type: 'circle', x: width / 2, y: height / 2, width: width * 0.8, height: width * 0.8, fill: primaryColor, opacity: 0.1 });
            break;

        case 'festival_lineup':
            addElement({ type: 'rect', width, height, fill: '#000' });
            addElement({ type: 'text', text: headline || "SUMMER FEST", x: 0, y: 50, width, fontSize: 32, fontWeight: '900', fill: '#fff', textAlign: 'center' });
            addElement({ type: 'text', text: "HEADLINER ONE\nHEADLINER TWO\nSPECIAL GUEST", x: 0, y: height * 0.3, width, fontSize: 24, fontWeight: '700', fill: primaryColor, textAlign: 'center' });
            break;

        case 'service_pricing':
            addElement({ type: 'rect', width, height, fill: '#f1f5f9' });
            addElement({ type: 'rect', x: width * 0.1, y: height * 0.3, width: width * 0.8, height: height * 0.5, fill: '#fff', cornerRadius: 10 });
            addElement({ type: 'text', text: headline || "BASIC PLAN", x: width * 0.1, y: height * 0.35, width: width * 0.8, fontSize: 24, fontWeight: '900', fill: '#1e293b', textAlign: 'center' });
            addElement({ type: 'text', text: "$29/mo", x: width * 0.1, y: height * 0.5, width: width * 0.8, fontSize: 48, fontWeight: '900', fill: primaryColor, textAlign: 'center' });
            break;

        case 'product_launch':
            addElement({ type: 'rect', width, height, fill: '#f8fafc' });
            addElement({ type: 'circle', x: width / 2, y: height / 2, width: width * 0.9, height: width * 0.9, fill: primaryColor, opacity: 0.05 });
            addElement({ type: 'text', text: "COMING SOON", x: 0, y: height * 0.2, width, fontSize: 14, fill: primaryColor, textAlign: 'center', fontWeight: '900', letterSpacing: 10 });
            addElement({ type: 'text', text: headline || "PRODUCT NAME", x: width * 0.1, y: height * 0.35, width: width * 0.8, fontSize: 48, fontWeight: '900', fill: '#1e293b', textAlign: 'center' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: width * 0.2, y: height * 0.55, width: width * 0.6, height: height * 0.35, cornerRadius: 20 });
            break;

        case 'thank_you':
            addElement({ type: 'rect', width, height, fill: '#fff' });
            addElement({ type: 'text', text: "Thank You", x: 0, y: height * 0.35, width, fontSize: 64, fontFamily: 'Great Vibes', fill: primaryColor, textAlign: 'center' });
            addElement({ type: 'text', text: subtitle || "We appreciate your support.", x: width * 0.2, y: height * 0.5, width: width * 0.6, fontSize: 16, fill: '#64748b', textAlign: 'center' });
            break;

        case 'coffee_shop':
            addElement({ type: 'rect', width, height, fill: '#fafaf9' });
            addElement({ type: 'rect', x: 0, y: 0, width, height: height * 0.4, fill: '#451a03' });
            addElement({ type: 'text', text: headline || "FRESH BREW", x: 40, y: height * 0.5, width: width - 80, fontSize: 42, fontFamily: 'Playfair Display', fill: '#451a03' });
            addElement({ type: 'text', text: "Best beans in town.", x: 40, y: height * 0.65, width: 200, fontSize: 14, fill: '#78350f' });
            break;

        case 'beauty_salon':
            addElement({ type: 'rect', width, height, fill: '#fff1f2' });
            addElement({ type: 'text', text: "GLAMOUR", x: 20, y: 40, width: width - 40, fontSize: 52, fontFamily: 'Cinzel', fill: '#be123c', opacity: 0.1 });
            addElement({ type: 'text', text: headline || "SPA & REJUVENATE", x: 20, y: height * 0.4, width: width - 40, fontSize: 32, fontFamily: 'Montserrat', fill: '#be123c', fontWeight: '700' });
            break;

        case 'marketing_agency':
            addElement({ type: 'rect', width, height, fill: '#1e1b4b' });
            addElement({ type: 'rect', x: 0, y: 0, width: 10, height, fill: '#6366f1' });
            addElement({ type: 'text', text: headline || "GROWTH\nSTRATEGY", x: 40, y: height * 0.3, width: width - 80, fontSize: 48, fontWeight: '900', fill: '#fff' });
            addElement({ type: 'text', text: "SCALING BRANDS SINCE 2020", x: 40, y: height * 0.6, width: width - 80, fontSize: 14, fill: '#818cf8', fontWeight: '700', letterSpacing: 4 });
            break;

        case 'summer_vibes':
            addElement({ type: 'rect', width, height, fill: '#fef08a' });
            addElement({ type: 'circle', x: width, y: 0, width: 400, height: 400, fill: '#fbbf24', opacity: 0.2 });
            addElement({ type: 'text', text: headline || "SUMMER HEAT", x: 0, y: height * 0.4, width, fontSize: 62, fontFamily: 'Bangers', fill: '#db2777', textAlign: 'center' });
            break;

        case 'recipe_card':
            addElement({ type: 'rect', width, height, fill: '#fff' });
            addElement({ type: 'rect', x: 0, y: 0, width, height: 10, fill: '#c2410c' });
            addElement({ type: 'text', text: headline || "ITALIAN PASTA", x: 30, y: 40, width: width - 60, fontSize: 28, fontFamily: 'Playfair Display', fill: '#c2410c' });
            addElement({ type: 'rect', x: 30, y: 80, width: 60, height: 2, fill: '#000' });
            break;

        case 'hiring_now':
            addElement({ type: 'rect', width, height, fill: '#1e293b' });
            addElement({ type: 'rect', x: 0, y: height * 0.4, width, height: 2, fill: '#3b82f6' });
            addElement({ type: 'text', text: "WE ARE HIRING", x: 40, y: height * 0.3, width: width - 80, fontSize: 36, fontWeight: '900', fill: '#fff' });
            addElement({ type: 'text', text: headline || "SENIOR DESIGNER", x: 40, y: height * 0.6, width: width - 80, fontSize: 24, fill: '#3b82f6', fontWeight: '800' });
            break;

        case 'mobile_app':
            addElement({ type: 'rect', width, height, fill: '#f1f5f9' });
            addElement({ type: 'rect', x: width * 0.2, y: height * 0.1, width: width * 0.6, height: height * 0.8, fill: '#fff', cornerRadius: 30, stroke: '#e2e8f0', strokeWidth: 1 });
            addElement({ type: 'text', text: headline || "NEW APP", x: 0, y: height * 0.92, width, fontSize: 16, fontWeight: '900', fill: '#6366f1', textAlign: 'center' });
            break;

        case 'dance_class':
            addElement({ type: 'rect', width, height, fill: '#000' });
            addElement({ type: 'text', text: headline || "DANCE\nSTUDIO", x: 20, y: 40, width: width - 40, fontSize: 80, fontWeight: '900', fill: '#fff', opacity: 0.1 });
            addElement({ type: 'text', text: "STEP INTO BEAT", x: 0, y: height * 0.45, width, fontSize: 32, fontFamily: 'Bebas Neue', fill: '#facc15', textAlign: 'center' });
            break;

        case 'winter_clearance':
            addElement({ type: 'rect', width, height, fill: '#f1f5f9' });
            addElement({ type: 'circle', x: 0, y: 0, width: 300, height: 300, fill: '#3b82f6', opacity: 0.1 });
            addElement({ type: 'text', text: "WINTER SALE", x: 0, y: height * 0.3, width, fontSize: 52, fontWeight: '900', fill: '#1e3a8a', textAlign: 'center' });
            addElement({ type: 'text', text: "UP TO 70% OFF", x: 0, y: height * 0.45, width, fontSize: 18, fill: '#3b82f6', textAlign: 'center', letterSpacing: 10 });
            break;

        case 'portfolio_showcase':
            addElement({ type: 'rect', width, height, fill: '#000' });
            addElement({ type: 'rect', x: 20, y: 20, width: width - 40, height: height - 40, fill: '#111', stroke: '#333', strokeWidth: 1 });
            addElement({ type: 'text', text: headline || "CREATIVE WORK", x: 40, y: 60, width: width - 80, fontSize: 32, fontWeight: '900', fill: '#fff' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: 40, y: 140, width: width - 80, height: height * 0.6 });
            break;

        case 'charity_gala':
            addElement({ type: 'rect', width, height, fill: '#4c0519' });
            addElement({ type: 'text', text: "GIVING TUESDAY", x: 0, y: 60, width, fontSize: 14, fill: '#fb7185', textAlign: 'center', letterSpacing: 5 });
            addElement({ type: 'text', text: headline || "HELP US REBUILD", x: width * 0.1, y: height * 0.3, width: width * 0.8, fontSize: 42, fontFamily: 'EB Garamond', fill: '#fff', textAlign: 'center' });
            addElement({ type: 'rect', x: width / 2 - 100, y: height * 0.7, width: 200, height: 50, fill: '#fb7185', cornerRadius: 5 });
            addElement({ type: 'text', text: "DONATE NOW", x: width / 2 - 100, y: height * 0.7 + 12, width: 200, fontSize: 16, fill: '#fff', textAlign: 'center', fontWeight: 'bold' });
            break;

        case 'interior_design':
            addElement({ type: 'rect', width, height, fill: '#fafaf9' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: 0, y: 0, width, height: height * 0.5 });
            addElement({ type: 'text', text: headline || "MINIMALIST\nSPACES", x: 30, y: height * 0.6, width: width - 60, fontSize: 36, fontFamily: 'Forum', fill: '#444' });
            addElement({ type: 'rect', x: 30, y: height * 0.8, width: 40, height: 2, fill: '#000' });
            break;

        case 'photography_studio':
            addElement({ type: 'rect', width, height, fill: '#111' });
            addElement({ type: 'rect', x: width * 0.1, y: height * 0.1, width: width * 0.8, height: height * 0.8, fill: 'transparent', stroke: '#fff', strokeWidth: 1, opacity: 0.2 });
            addElement({ type: 'text', text: "LENS & LIGHT", x: 0, y: height / 2 - 20, width, fontSize: 24, fill: '#fff', textAlign: 'center', letterSpacing: 8 });
            break;

        case 'music_album':
            addElement({ type: 'rect', width, height, fill: '#000' });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, width, height, opacity: 0.5 });
            addElement({ type: 'text', text: headline || "THE SOUND", x: 20, y: height * 0.7, width: width - 40, fontSize: 64, fontWeight: '900', fill: '#fff' });
            addElement({ type: 'text', text: "NEW SINGLE OUT NOW", x: 20, y: height * 0.85, width: width - 40, fontSize: 14, fill: '#6366f1', fontWeight: '700' });
            break;

        case 'crypto_token':
            addElement({ type: 'rect', width, height, fill: '#0a0a0f' });
            addElement({ type: 'circle', x: width / 2, y: height * 0.4, width: 240, height: 240, fill: 'transparent', stroke: '#f59e0b', strokeWidth: 2 });
            addElement({ type: 'text', text: headline || "GOLDEN TOKEN", x: 0, y: height * 0.7, width, fontSize: 32, fontWeight: '900', fill: '#f59e0b', textAlign: 'center' });
            addElement({ type: 'text', text: "LOCKED & SECURE", x: 0, y: height * 0.8, width, fontSize: 14, fontFamily: 'Space Mono', fill: '#4b5563', textAlign: 'center' });
            break;

        case 'webinar_host':
            addElement({ type: 'rect', width, height, fill: '#fff' });
            addElement({ type: 'rect', x: 0, y: 0, width, height: height * 0.4, fill: '#3b82f6' });
            addElement({ type: 'text', text: headline || "MASTERING AI", x: 40, y: height * 0.5, width: width - 80, fontSize: 42, fontWeight: '900', fill: '#1e293b' });
            addElement({ type: 'text', text: "LIVE WEBINAR | OCT 24", x: 40, y: height * 0.65, width: width - 80, fontSize: 18, fill: '#3b82f6', fontWeight: '700' });
            break;

        case 'magic':
            // Neural Layout Prediction logic
            const isDarkBrand = primaryColor.startsWith('#0') || primaryColor.startsWith('#1');

            // Predicting background based on brand tone
            addElement({ type: 'rect', width, height, fill: isDarkBrand ? '#0a0a0f' : '#ffffff' });

            // Neural bias calculation
            const bias = (headline || "").length > 15 ? 0.05 : -0.05;

            // Core ML Elements
            addElement({
                type: 'text',
                text: headline || "AI GENERATED",
                x: width * 0.05,
                y: height * (0.35 + bias),
                width: width * 0.9,
                fontSize: 100 * scale, // Larger base for impact
                fontWeight: '900',
                fill: primaryColor,
                textAlign: 'center',
                shadowBlur: 20 * scale,
                shadowColor: primaryColor,
                shadowOpacity: 0.3
            });

            // Predicted secondary accents
            addElement({
                type: 'rect',
                x: width / 2 - 40 * scale,
                y: height * 0.55,
                width: 80 * scale,
                height: 4 * scale,
                fill: primaryColor
            });

            if (backgroundImage) {
                addElement({
                    type: 'image',
                    imageUrl: backgroundImage,
                    x: width * 0.25,
                    y: height * 0.65,
                    width: width * 0.5,
                    height: height * 0.25,
                    cornerRadius: 15 * scale
                });
            }
            break;

        default:
            // Fallback for any unimplemented templates
            addElement({ type: 'rect', width, height, fill: '#f8fafc' });
            addElement({ type: 'rect', x: 0, y: 0, width, height: 10, fill: primaryColor });
            addElement({
                type: 'text',
                text: headline || "PREMIUM TEMPLATE",
                x: width * 0.1,
                y: height * 0.3,
                width: width * 0.8,
                fontSize: 42,
                fontWeight: '900',
                fill: '#1e293b',
                textAlign: 'center'
            });
            addElement({
                type: 'text',
                text: subtitle || "Custom layout coming soon for this category.",
                x: width * 0.1,
                y: height * 0.5,
                width: width * 0.8,
                fontSize: 16,
                fill: '#64748b',
                textAlign: 'center'
            });
            if (backgroundImage) addElement({ type: 'image', imageUrl: backgroundImage, x: width * 0.25, y: height * 0.6, width: width * 0.5, height: height * 0.3, cornerRadius: 10 });
            break;
    }

    return elements;
}
