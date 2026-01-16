import User from '../models/User.js';

class UserRepository {
    constructor(storageManager) {
        this.storage = storageManager;
        this.users = new Map();
        this.storageKey = 'users';
        this._loadUsersFromStorage();
    }

    create(userData) {
        if (this.findByUsername(userData.username)) {
            throw new Error('Username already used');
        }

        const user = new User(
            userData.username,
            userData.email,
            userData.fullName
        );

        this.users.set(user.id, user);
        this._saveUsersToStorage();
        return user;
    }

    findByUsername(username) {
        const u = username.toLowerCase();
        for (const user of this.users.values()) {
            if (user.username === u) return user;
        }
        return null;
    }

    _loadUsersFromStorage() {
        const data = this.storage.load(this.storageKey, []);
        data.forEach(u => {
            const user = User.fromJSON(u);
            this.users.set(user.id, user);
        });
    }

    _saveUsersFromStorage() {
        this.storage.save(
            this.storageKey,
            Array.from(this.users.values()).map(u => u.toJSON())
        );
    }
}

export default UserRepository;
