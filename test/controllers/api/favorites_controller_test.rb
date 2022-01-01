require 'test_helper'

class Api::FavoritesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_favorites_create_url
    assert_response :success
  end

  test "should get delete" do
    get api_favorites_delete_url
    assert_response :success
  end

  test "should get show" do
    get api_favorites_show_url
    assert_response :success
  end

  test "should get index" do
    get api_favorites_index_url
    assert_response :success
  end

end
