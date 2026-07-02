@extends('layouts.app')

@section('title', 'Mohammad Vaish | Portfolio')

@section('content')

    @include('sections.hero')
    @include('sections.about')
    @include('sections.services')
    @include('sections.projects')
    @include('sections.experience')
    @include('sections.why-choose-me')
    @include('sections.contact')

@endsection