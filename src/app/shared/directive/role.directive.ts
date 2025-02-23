import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Directive({
    selector: '[hasRole]'
})
export class HasRoleDirective {
    private roles: string[] = [];

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private _authService: AuthService // Inject your AuthService
    ) { }

    @Input() set hasRole(roles: string[]) {
        this.roles = roles;
        this.updateView();
    }

    private updateView() {
        // Get the user's role from storage
        const userRole = this._authService.getUserFromStorage().role;
        // Check if the user has any of the required roles
        const hasRole = this.roles.includes(userRole);

        if (hasRole) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}