import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Apollo} from 'apollo-angular';
import {findOnePost} from '@app/core/models';


@Injectable()
export class PostResolver implements Resolve<any> {
  constructor(private apollo: Apollo) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // console.log('run');
      return this.apollo.query<any>({
      query:  findOnePost(String(route.params['id']))
    });
  }

}
