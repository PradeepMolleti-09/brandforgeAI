import axios from "axios";

/**
 * Microservice-style Data Service for Designs
 * This can easily be scaled to an external backend or service.
 */
export class DesignService {
    private static baseUrl = "/api/design";

    static async getDesignById(id: string) {
        try {
            const response = await axios.get(`${this.baseUrl}?id=${id}`);
            return response.data;
        } catch (error) {
            console.error("DesignService.getDesignById failed:", error);
            throw error;
        }
    }

    static async saveDesign(id: string, elements: any[], layout: any) {
        try {
            const response = await axios.post(this.baseUrl, {
                id,
                elementsJson: elements,
                layoutJson: layout,
            });
            return response.data;
        } catch (error) {
            console.error("DesignService.saveDesign failed:", error);
            throw error;
        }
    }

    static async deleteDesign(id: string) {
        try {
            const response = await axios.delete(`${this.baseUrl}?id=${id}`);
            return response.data;
        } catch (error) {
            console.error("DesignService.deleteDesign failed:", error);
            throw error;
        }
    }
}
