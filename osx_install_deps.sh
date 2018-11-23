pip install -U numpy scipy pandas scikit-learn

# install docker
brew install docker
brew install docker-machine
brew cask install virtualbox
docker-machine create --driver virtualbox default
docker-machine env default
eval $(docker-machine env default)