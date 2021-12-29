require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module JcpPostgres
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    #TODO: check if this is working
    Rails.configuration.action_controller.per_form_csrf_tokens = true

    #TODO: remove this after auth tokens have been used with app/helpers/application_helper.rb
    config.action_controller.default_protect_from_forgery = false
  end
end
