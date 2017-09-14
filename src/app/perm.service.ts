import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';
import * as _ from 'lodash';

@Injectable()
export class PermService {

    userRoles: Array<string>; // roles of currently logged in uer
    constructor(private auth: AuthService,
                private db: AngularFireDatabase) {
        auth.user.map(user => {
            /// Set an array of user roles, ie ['admin', 'author', ...]
            return this.userRoles = _.keys(_.get(user, 'roles'));
        })
            .subscribe();
    }

    getPosts() {
        return this.db.list('posts');
    }
    getPost(key) {
        return this.db.object('posts/' + key);
    }

    get canRead(): boolean {
        const allowed = ['admin', 'author', 'reader'];
        return this.matchingRole(allowed);
    }
    get canEdit(): boolean {
        const allowed = ['admin', 'author'];
        return this.matchingRole(allowed);
    }
    get canDelete(): boolean {
        const allowed = ['admin'];
        return this.matchingRole(allowed);
    }

    private matchingRole(allowedRoles): boolean {
        return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
    }

    editPost(post, newData) {
        if ( this.canEdit ) {
            return this.db.object('posts/' + post.$key).update(newData);
        } else { console.log('action prevented!'); }
    }
    deletePost(key) {
        if ( this.canDelete ) {
            return this.db.list('posts/' + key).remove();
        } else { console.log('action prevented!'); }
    }
}
