require 'rails_helper'



describe Message do
  describe "#create" do
    describe "valid type" do

      it "is valid with empty image" do
        expect(build(:message, image: nil)).to be_valid
      end

      it "is valid with empty content" do
        expect(build(:message, content: nil)).to be_valid
      end

      it "is valid with a content and a image" do
        message = build(:message)
        message.valid?
        expect(message).to be_valid
      end
    end

    describe "invalid type" do

      it "is valid without a content and a image" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include('を入力してください')
      end

      it "is valid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      it "is valid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end

  end
end
