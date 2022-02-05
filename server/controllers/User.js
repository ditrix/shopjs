class User {
    async getAll(req, res) {
        res.status(200).send('Список всех польлзователей')
    }

    async getOne(req, res) {
        res.status(200).send('Получение одного пользователя')
    }

    async create(req, res) {
        res.status(200).send('Создание нового пользователя')
    }

    async update(req, res) {
        res.status(200).send('Обновление пользователя')
    }

    async delete(req, res) {
        res.status(200).send('Удаление пользователя')
    }

    async signup(req, res) {
        res.status(200).send('регистрация польхователя')
    }

    async login(req, res) {
        res.status(200).send('вход в личный кабинет')
    }

    async check(req, res) {
        res.status(200).send('проверка авторизации') 
    }

}

export default new User()