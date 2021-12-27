require 'test_helper'

class Api::ShopsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_shops_index_url
    assert_response :success
  end

  test "should get create" do
    get api_shops_create_url
    assert_response :success
  end

  test "should get show" do
    get api_shops_show_url
    assert_response :success
  end

  test "should get update" do
    get api_shops_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_shops_destroy_url
    assert_response :success
  end

end
