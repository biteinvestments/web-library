import { ButtonModule } from 'bite-ui/button';
import { AlertModule } from 'bite-ui/alert';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AlertModule } from 'bite-ui/alert';
export class BiteUiModule {
}
BiteUiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                exports: [
                    AlertModule,
                    ButtonModule
                ],
                providers: [],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml0ZS11aS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2phY2svamFjay9wcm9qZWN0L3dlYi1saWJyYXJ5L3Byb2plY3RzL2JpdGUtdWkvIiwic291cmNlcyI6WyJiaXRlLXVpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQywrQ0FBK0M7QUFZL0MsTUFBTSxPQUFPLFlBQVk7OztZQVZ4QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ1o7Z0JBQ0YsT0FBTyxFQUFFO29CQUNQLFdBQVc7b0JBQ1gsWUFBWTtpQkFDYjtnQkFDRCxTQUFTLEVBQUUsRUFBRTthQUNkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAnYml0ZS11aS9idXR0b24nO1xuaW1wb3J0IHsgQWxlcnRNb2R1bGUgfSBmcm9tICdiaXRlLXVpL2FsZXJ0JztcblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8vIGltcG9ydCB7IEFsZXJ0TW9kdWxlIH0gZnJvbSAnYml0ZS11aS9hbGVydCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICBdLFxuICBleHBvcnRzOiBbXG4gICAgQWxlcnRNb2R1bGUsXG4gICAgQnV0dG9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG59KVxuZXhwb3J0IGNsYXNzIEJpdGVVaU1vZHVsZSB7fVxuIl19