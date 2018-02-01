import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GameTab from '../js/components/game-tab';
import DetailsModal from '../js/details-modal';
//jest.mock('../js/details-modal');


configure({ adapter: new Adapter() });

const mockGameData = {
    "deck":"The Hunter claims to be the most realistic hunting game online.  The game client is free to download and you get to hunt Mule deer. To hunt more species tags may by purchased using microtransactions or you get unlimited tags with a membership.",
    "id":25630,
    "image":{
        "icon_url":"https://www.giantbomb.com/api/image/square_avatar/2504368-6189288757-thehu.png",
        "medium_url":"https://www.giantbomb.com/api/image/scale_medium/2504368-6189288757-thehu.png",
        "screen_url":"https://www.giantbomb.com/api/image/screen_medium/2504368-6189288757-thehu.png",
        "screen_large_url":"https://www.giantbomb.com/api/image/screen_kubrick/2504368-6189288757-thehu.png",
        "small_url":"https://www.giantbomb.com/api/image/scale_small/2504368-6189288757-thehu.png",
        "super_url":"https://www.giantbomb.com/api/image/scale_large/2504368-6189288757-thehu.png",
        "thumb_url":"https://www.giantbomb.com/api/image/scale_avatar/2504368-6189288757-thehu.png",
        "tiny_url":"https://www.giantbomb.com/api/image/square_mini/2504368-6189288757-thehu.png",
        "original_url":"https://www.giantbomb.com/api/image/original/2504368-6189288757-thehu.png",
        "image_tag":"All Images"
    },
    "name":"theHunter",
    "original_game_rating":null,
    "original_release_date":"2009-03-05 00:00:00",
    "resource_type":"game"
};

DetailsModal.Open = jest.fn();

test('GameTab calls DetailsModal.Oepn() when clicked, and passes correct arguments', function(){
	
	let gameTabWrapper = shallow(<GameTab gameData={mockGameData}/>);
	gameTabWrapper.simulate('click', {});
	
	expect(DetailsModal.Open).toHaveBeenCalledWith(mockGameData);
});







