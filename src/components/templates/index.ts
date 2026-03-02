import MovieTemplate from './MovieTemplate';
import SaleTemplate from './SaleTemplate';
import BusinessTemplate from './BusinessTemplate';
import EventTemplate from './EventTemplate';
import MinimalTemplate from './MinimalTemplate';

export const TemplateMap = {
    movie: MovieTemplate,
    sale: SaleTemplate,
    business: BusinessTemplate,
    event: EventTemplate,
    minimal: MinimalTemplate
};

export type TemplateType = keyof typeof TemplateMap;
