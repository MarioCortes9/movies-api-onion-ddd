import { InvalidRatingError, InvalidTitleError, InvalidYearError } from './movie-errors';


export enum MovieGenre {
    ACTION = 'ACTION',
    COMEDY = 'COMEDY',
    DRAMA = 'DRAMA',
    HORROR = 'HORROR',
    SCI_FI = 'SCI_FI',
}


export interface MovieProps {
    id: string;
    title: string;
    description?: string;
    releaseYear: number;
    genre: MovieGenre;
    watched: boolean;
    rating?: number;
}


export class Movie {
    constructor(private readonly props: MovieProps) {
        this.validate();
    }


    static create(props: Omit<MovieProps, 'watched'> & { watched?: boolean }): Movie {
        return new Movie({
            ...props,
            watched: props.watched ?? false,
        });
    }


    private validate() {
        if (this.props.title.length < 2 || this.props.title.length > 120) {
            throw new InvalidTitleError();
        }
        if (this.props.releaseYear < 1888 || this.props.releaseYear > 2100) {
            throw new InvalidYearError();
        }
        if (this.props.rating && (this.props.rating < 1 || this.props.rating > 5)) {
            throw new InvalidRatingError();
        }
    }


    getProps(): MovieProps {
        return { ...this.props };
    }


    markAsWatched() {
        this.props.watched = true;
    }


    update(props: Partial<Omit<MovieProps, 'id'>>) {
        Object.assign(this.props, props);
        this.validate();
    }
}
