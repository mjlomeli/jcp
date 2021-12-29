require 'json'

class Api::ImagesController < ApplicationController
  def index
    @image = Image.where(**query_params)
    render json: @image
  end

  def show
    @image = Image.find_by(id: params[:id])
    if @image
      render json: @image
    else
      render json: ["Could not locate image id: #{params[:id]}"], status: 400
    end
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      render :show
    else
      render json: @image.errors.full_messages, status: 401
    end
  end

  def update
    @image = Image.find_by(id: params[:id])
    if @image && @image.update_attributes(image_params)
      render :show
    elsif !@image
      render json: ["Could not locate image id: #{params[:id]}"], status: 400
    else
      render json: @image.errors.full_messages, status: 401
    end
  end

  def destroy
    @image = Image.find_by(id: params[:id])
    if @image && @image.destroy
      render :show
    elsif !@image
      render json: ["Could not locate image id: #{params[:id]}"], status: 400
    else
      render json: @image.errors.full_messages, status: 401
    end
  end

  private

  def query_params
    args = []
    params.permit(:id, :dimension, :group_name, :group_id, :format).each do |k, v|
      if ['id', 'group_id'].include?(k)
        args.push([k, ActiveModel::Type::Decimal.new.cast(v)])
      elsif ['group_name', 'dimension'].include?(k)
        args.push([k, ActiveModel::Type::String.new.cast(v)])
      end
    end
    args.to_h
  end

  def image_params
    # the .require makes it so that when a controller is using the
    # image_params function, if image_template doesn't exist in the body_template
    # provided by a form, then the controller will not continue
    params.require(:image)
          .permit(:data, :mimetype, :size, :url, :encoding, :name, :group_name,
                  :group_id, :dimension, :created_at, :updated_at)
  end

end
