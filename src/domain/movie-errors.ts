export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DomainError';
    }
}


export class InvalidTitleError extends DomainError {
    constructor() {
        super('Title must be between 2 and 120 characters');
    }
}


export class InvalidYearError extends DomainError {
    constructor() {
        super('Invalid release year (must be between 1888 and 2100)');
    }
}


export class InvalidRatingError extends DomainError {
    constructor() {
        super('Rating must be between 1 and 5');
    }
}
