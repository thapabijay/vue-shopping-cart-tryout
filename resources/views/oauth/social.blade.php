@extends('layouts.app')

@section('content')
<div>
    @if ($errors->has('msg'))
            {{ $errors->first('msg') }}
            ×
    @endif
    <div>
        Social Login   
        <div>
            Authenticate using your social network account from one of following providers
            <div class="form-group">
                <div class="col-md-6 col-md-offset-4">
                    <a href="{{ url('/auth/gmail') }}" class="btn btn-gmail"><i class="fa fa-gmail"></i> Gmail</a>
                    <a href="{{ url('/auth/twitter') }}" class="btn btn-twitter"><i class="fa fa-twitter"></i> Twitter</a>
                    <a href="{{ url('/auth/facebook') }}" class="btn btn-facebook"><i class="fa fa-facebook"></i> Facebook</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection