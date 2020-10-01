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
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
    this.activatedRoute.params.subscribe(params => {
      if (params.id){
        this.isEdit = true;
        const { data } = this.activatedRoute.snapshot.data["post"];
        this.stFormGroup.get('title').setValue(data.post.title);
        this.stFormGroup.get('body').setValue(data.post.body);
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
          id: params['id']
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
