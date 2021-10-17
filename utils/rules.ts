export class Rules {
    static EMAIL_RULES(): Array<any> {
        return [
            (value: string) => !!value || "Required",
            (value: string) => {
                const pattern = /(\w|\d|\.-_ñÑ\+\*\{\})+@(\w|\d)+\.\w/;
                return pattern.test(value) || "Invalid email"
            },
        ];
    }

    static PASSWORD_RULES(): Array<any> {
        return [
            (value: string) => !!value || "Required",
            (value: string) => (value || '').length >= 12 || "Minimun length 12",
            (value: string) => {
                const pattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[@%&+*{}:;,_-]).{12,}$/;
                return pattern.test(value) || "Invalid password";
            },
        ]
    }
}