import { BadRequestException } from "@nestjs/common";

export class AssertionConcern {
    public static assertArgumentFalse (boolValue: boolean, message: string) {
        if (boolValue) {
            throw new BadRequestException(message);
        }
    }

    public static assertArgumentLengthWithMaximum (stringValue: string, maximum: number, message: string) {
        const length = stringValue.trim().length;
        if (length > maximum) {
            throw new BadRequestException(message);
        }
    }

    public static assertArgumentLengthWithMinimumAndMaximum (stringValue: string, minimum: number, maximum: number, message: string) {
        const length = stringValue.trim().length;
        if (length < minimum || length > maximum) {
            throw new BadRequestException(message);
        }
    }

    public static assertArgumentNotEmpty (stringValue: string, message: string) {
        if (stringValue == null || stringValue == undefined || stringValue.trim().length == 0) {
            throw new BadRequestException(message);
        }
    }

    public static assertArgumentNotNull (object1: any, message: string) {
        if (object1 == null || object1 == undefined) {
            throw new BadRequestException(message);
        }
    }

    public static assertArgumentHasData (objects: any[], message: string) {
        this.assertArgumentNotNull(objects, message);
        if (objects.length == 0) {
            throw new BadRequestException(message);
        }
    }

    public static assertAnArgumentNotNull (objects: any[], message: string) {
        let hasAnNotNull = false;
        for (let index = 0; index < objects.length; index++) {
            if (objects[index]) {
                hasAnNotNull = true;
                index = objects.length;
            }
        }
        if (!hasAnNotNull) {
            throw new BadRequestException(message);
        }
    }

    public static assertArgumentRange (value: number, minimum: number, maximum: number, message: string) {
        if (value < minimum || value > maximum) {
            throw new BadRequestException(message);
        }
    }

    public static assertArgumentTrue (boolValue: boolean, message: string) {
        if (!boolValue) {
            throw new BadRequestException(message);
        }
    }

    public static assertStateFalse (boolValue: boolean, message: string) {
        if (boolValue) {
            throw new BadRequestException(message);
        }
    }

    public static assertStateTrue (boolValue: boolean, message: string) {
        if (!boolValue) {
            throw new BadRequestException(message);
        }
    }
}