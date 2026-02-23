export class InvalidTitleError extends Error {
    constructor() {
        super('Movie title must be between 2 and 120 characters');
        this.name = 'InvalidTitleError';
    }
}

export class InvalidYearError extends Error {
    constructor() {
        super('Movie release year must be between 1888 and 2100');
        this.name = 'InvalidYearError';
    }
}

export class InvalidRatingError extends Error {
    constructor() {
        super('Movie rating must be between 1 and 5');
        this.name = 'InvalidRatingError';
    }
}
