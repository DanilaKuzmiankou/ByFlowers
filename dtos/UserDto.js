module.exports = class UserDto {
    name
    email
    phone
    constructor(model) {
        this.email = model.email
        this.name = model.name
        this.phone = model.phone
    }
}
