<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ env('APP_NAME') }}</title>
    <script>window.api_url = "{{ env('API_URL') }}";</script>
</head>
<body>
<main>
    <div id="app"></div>
</main>
<script src="/js/app.js"></script>
</body>
</html>
