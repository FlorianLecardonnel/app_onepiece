export interface Saga {
    id: number;
    title: string;
    saga_number: string;
    saga_chapitre: string;
    saga_volume: string;
    saga_episode: string;
}

export interface Arc {
    id: number;
    title: string;
    description: string;
    saga: Saga;
}
