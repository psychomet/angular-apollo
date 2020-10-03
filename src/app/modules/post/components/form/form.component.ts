import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {createPost, updatePost} from '@app/core/models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() private postUpdated = new EventEmitter();

  stFormGroup: FormGroup;
  isEdit: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.stFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      breed: ['', Validators.required],
    });
    this.activatedRoute.params.subscribe(params => {
      if (params.id){
        this.isEdit = true;
        const { data } = this.activatedRoute.snapshot.data["post"];
        this.stFormGroup.get('name').setValue(data.cat.name);
        this.stFormGroup.get('age').setValue(data.cat.age);
        this.stFormGroup.get('breed').setValue(data.cat.breed);
      }
    });
  }

  onSubmit(){
    const params = this.activatedRoute.snapshot.params;
    const form = this.stFormGroup.value;
    if (this.isEdit){
      this.apollo.mutate({
        mutation: updatePost,
        variables: {
          input: form,
          id: String(params['id'])
        }
      }).subscribe(({ data }) => {
        console.log('updated', data);
        this.postUpdated.emit();
        this.stFormGroup.reset();
        this.router.navigateByUrl('/post');
      });
    }else {
      this.apollo.mutate({
        mutation: createPost,
        variables: {
          input: form
        }
      }).subscribe(({ data }) => {
        console.log('created', data);
        this.postUpdated.emit();
        this.stFormGroup.reset();
      });
    }
  }

}
