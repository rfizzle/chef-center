#!/usr/bin/env bash

bin/rails db:migrate RAILS_ENV=production
bin/rails server -e production -p 9292